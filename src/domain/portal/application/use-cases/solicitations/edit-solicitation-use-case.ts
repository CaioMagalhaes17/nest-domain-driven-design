import { Either, left, right } from "src/core/Either"
import { UnauthorizedSolicitationActionError } from "../../errors/repair/solicitations/UnauthorizedSolicitationAction"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { ISolicitationFormRepository } from "../../repositories/repair/solicitation-form.repository.interface"
import { SolicitationForm } from "@/domain/portal/enterprise/repair/solicitation.form"
import { Solicitation } from "@/domain/portal/enterprise/repair/solicitation"

type EditSolicitationFormUseCaseResponse = Either<
  SolicitationNotFoundError | UnauthorizedSolicitationActionError,
  Solicitation
>

interface EditSolicitationUseCaseI {
  solicitationFormPayload: Partial<SolicitationForm>
  status: string
  userId: string
  solicitationId: string
}
export class EditSolicitationFormUseCase {
  constructor(
    private solicitationRepository: ISolicitationRepository,
    private solicitationFormRepository: ISolicitationFormRepository,
  ) {}

  async execute({
    solicitationFormPayload,
    status,
    userId,
    solicitationId,
  }: EditSolicitationUseCaseI): Promise<EditSolicitationFormUseCaseResponse> {
    const solicitation =
      await this.solicitationRepository.findById(solicitationId)
    if (!solicitation) return left(new SolicitationNotFoundError())
    if (userId !== solicitation.userId)
      return left(new UnauthorizedSolicitationActionError())
    if (status) {
      await this.solicitationRepository.updateById(solicitation.id, {
        status,
      })
    }
    if (solicitationFormPayload) {
      await this.solicitationFormRepository.updateById(
        solicitation.form.id,
        solicitationFormPayload,
      )
    }

    const solicitationUpdated =
      await this.solicitationRepository.findById(solicitationId)
    return right(solicitationUpdated)
  }
}
