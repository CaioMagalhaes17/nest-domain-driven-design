import { Either, left } from "src/core/Either"
import { UnauthorizedSolicitationActionError } from "../../errors/repair/solicitations/UnauthorizedSolicitationAction"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { ISolicitationFormRepository } from "../../repositories/repair/solicitation-form.repository.interface"
import { SolicitationForm } from "@/domain/portal/enterprise/repair/solicitation.form"

type EditSolicitationFormUseCaseResponse = Either<
  SolicitationNotFoundError | UnauthorizedSolicitationActionError,
  void
>

interface EditSolicitationUseCaseI {
  solicitationFormPayload: SolicitationForm
  userId: number
  solicitationId: string
}
export class EditSolicitationFormUseCase {
  constructor(
    private solicitationRepository: ISolicitationRepository,
    private solicitationFormRepository: ISolicitationFormRepository,
  ) {}

  async execute({
    solicitationFormPayload,
    userId,
    solicitationId,
  }: EditSolicitationUseCaseI): Promise<EditSolicitationFormUseCaseResponse> {
    const solicitation =
      await this.solicitationRepository.findById(solicitationId)
    if (!solicitation) return left(new SolicitationNotFoundError())
    if (userId !== solicitation.userId)
      return left(new UnauthorizedSolicitationActionError())
    await this.solicitationFormRepository.updateById(
      solicitationId,
      solicitationFormPayload,
    )
  }
}
