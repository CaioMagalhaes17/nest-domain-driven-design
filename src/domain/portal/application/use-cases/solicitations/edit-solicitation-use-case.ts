import { Either, left } from "src/core/Either"
import { SolicitationFormRepository } from "../../repositories/repair/solicitation-form.repository"
import { SolicitationRepository } from "../../repositories/repair/solicitation-repository"
import { UnauthorizedSolicitationActionError } from "../../errors/repair/solicitations/UnauthorizedSolicitationAction"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"

type EditSolicitationUseCaseResponse = Either<
  SolicitationNotFoundError | UnauthorizedSolicitationActionError,
  void
>

interface EditSolicitationUseCaseI {
  solicitationFormPayload: any
  userId: string
  solicitationId: number
}
export class EditSolicitationUseCase {
  constructor(
    private solicitationRepository: SolicitationRepository,
    private solicitationFormRepository: SolicitationFormRepository,
  ) {}

  async execute({
    solicitationFormPayload,
    userId,
    solicitationId,
  }: EditSolicitationUseCaseI): Promise<EditSolicitationUseCaseResponse> {
    const solicitation =
      await this.solicitationRepository.fetchById(solicitationId)
    if (!solicitation) return left(new SolicitationNotFoundError())
    if (userId !== solicitation.userId)
      return left(new UnauthorizedSolicitationActionError())
    await this.solicitationFormRepository.update(
      solicitationId,
      solicitationFormPayload,
    )
  }
}
