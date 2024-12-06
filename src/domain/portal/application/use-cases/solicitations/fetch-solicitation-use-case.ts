import { Either, left, right } from "src/core/Either"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { Solicitation } from "src/domain/portal/enterprise/repair/solicitation"
import { UnauthorizedSolicitationActionError } from "../../errors/repair/solicitations/UnauthorizedSolicitationAction"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"

type FetchSolicitationUseCaseResponse = Either<
  SolicitationNotFoundError,
  {
    solicitation: Solicitation
  }
>

export class FetchSolicitationUseCase {
  constructor(private solicitationRepository: ISolicitationRepository) {}

  async execute(
    solicitationId: string,
    userId: number,
  ): Promise<FetchSolicitationUseCaseResponse> {
    console.log("niggere")
    const solicitation =
      await this.solicitationRepository.findById(solicitationId)
    if (!solicitation) return left(new SolicitationNotFoundError())
    if (solicitation.userId !== userId)
      return left(new UnauthorizedSolicitationActionError())

    return right({ solicitation })
  }
}
