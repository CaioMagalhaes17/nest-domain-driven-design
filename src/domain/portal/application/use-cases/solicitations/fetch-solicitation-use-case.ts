import { Either, left, right } from "src/core/Either"
import { SolicitationRepository } from "../../repositories/repair/solicitation-repository"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { Solicitation } from "src/domain/portal/enterprise/repair/solicitation"
import { UnauthorizedSolicitationActionError } from "../../errors/repair/solicitations/UnauthorizedSolicitationAction"

type FetchSolicitationUseCaseResponse = Either<
  SolicitationNotFoundError,
  {
    solicitation: Solicitation
  }
>

export class FetchSolicitationUseCase {
  constructor(private solicitationRepository: SolicitationRepository) {}

  async execute(
    solicitationId: number,
    userId: number,
  ): Promise<FetchSolicitationUseCaseResponse> {
    const solicitation =
      await this.solicitationRepository.fetchById(solicitationId)
    if (!solicitation) return left(new SolicitationNotFoundError())
    if (solicitation.userId !== userId)
      return left(new UnauthorizedSolicitationActionError())

    return right({ solicitation })
  }
}
