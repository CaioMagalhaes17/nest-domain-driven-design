import { Either, left, right } from "src/core/Either"
import { SolicitationRepository } from "../../repositories/repair/solicitation-repository"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { Solicitation } from "src/domain/portal/enterprise/repair/solicitation"

type FetchSolicitationsUseCaseResponse = Either<
  SolicitationNotFoundError,
  {
    solicitations: Solicitation[]
  }
>

export class FetchSolicitationsUseCase {
  constructor(private solicitationRepository: SolicitationRepository) {}

  async execute(userId: number): Promise<FetchSolicitationsUseCaseResponse> {
    const solicitations =
      await this.solicitationRepository.fetchSolicitations(userId)
    if (!solicitations) return left(new SolicitationNotFoundError())

    return right({ solicitations })
  }
}
