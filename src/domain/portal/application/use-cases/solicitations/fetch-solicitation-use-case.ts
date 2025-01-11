import { Either, left, right } from "src/core/Either"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { Solicitation } from "src/domain/portal/enterprise/repair/solicitation"
import { UnauthorizedSolicitationActionError } from "../../errors/repair/solicitations/UnauthorizedSolicitationAction"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { IClientProfileRepository } from "../../repositories/profile/client/client-profile.repository"

type FetchSolicitationUseCaseResponse = Either<
  SolicitationNotFoundError,
  {
    solicitation: Solicitation
  }
>

export class FetchSolicitationUseCase {
  constructor(
    private solicitationRepository: ISolicitationRepository,
    private clientProfileRepository: IClientProfileRepository,
  ) {}

  async execute(
    solicitationId: string,
    profileId: string,
  ): Promise<FetchSolicitationUseCaseResponse> {
    const solicitation =
      await this.solicitationRepository.findById(solicitationId)
    if (!solicitation) return left(new SolicitationNotFoundError())

    console.log(solicitation.clientProfile)
    if (profileId !== solicitation.clientProfile.id.toString())
      return left(new UnauthorizedSolicitationActionError())

    return right({ solicitation })
  }
}
