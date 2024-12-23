import { Either, left, right } from "src/core/Either"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { Solicitation } from "src/domain/portal/enterprise/repair/solicitation"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"

type FetchSolicitationsUseCaseResponse = Either<
  SolicitationNotFoundError,
  {
    solicitations: Solicitation[]
  }
>

export class FetchUserSolicitationsUseCase {
  constructor(private solicitationRepository: ISolicitationRepository) {}

  async execute(userId: number): Promise<FetchSolicitationsUseCaseResponse> {
    const solicitations = await this.solicitationRepository.findByParam<{
      userId: number
    }>({
      userId,
    })
    if (!solicitations) return left(new SolicitationNotFoundError())

    return right({ solicitations })
  }
}
