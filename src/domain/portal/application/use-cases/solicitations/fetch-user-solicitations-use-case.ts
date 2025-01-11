import { Either, left, right } from "src/core/Either"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { Solicitation } from "src/domain/portal/enterprise/repair/solicitation"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { IClientProfileRepository } from "../../repositories/profile/client/client-profile.repository"

type FetchSolicitationsUseCaseResponse = Either<
  SolicitationNotFoundError,
  {
    solicitations: Solicitation[]
  }
>

export class FetchUserSolicitationsUseCase {
  constructor(
    private solicitationRepository: ISolicitationRepository,
    private clientProfileRepository: IClientProfileRepository,
  ) {}

  async execute(userId: string): Promise<FetchSolicitationsUseCaseResponse> {
    const profile = await this.clientProfileRepository.findByParam<{
      userId: string
    }>({ userId })
    const solicitations = await this.solicitationRepository.findByParam<{
      clientProfile: string
    }>({
      clientProfile: profile[0].id,
    })
    if (!solicitations) return left(new SolicitationNotFoundError())

    return right({ solicitations })
  }
}
