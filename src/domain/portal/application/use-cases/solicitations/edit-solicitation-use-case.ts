import { Either, left, right } from "src/core/Either"
import { UnauthorizedSolicitationActionError } from "../../errors/repair/solicitations/UnauthorizedSolicitationAction"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { ISolicitationFormRepository } from "../../repositories/repair/solicitation-form.repository.interface"
import { SolicitationForm } from "@/domain/portal/enterprise/repair/solicitation.form"
import { Solicitation } from "@/domain/portal/enterprise/repair/solicitation"
import { IBudgetRepository } from "../../repositories/repair/budget-repository"
import { ActionNotAllowedError } from "../../errors/repair/solicitations/ActionNotAllowed"
import { CANCELED_SOLICITATION_STATUS } from "../../constants/solicitation-status"

type EditSolicitationFormUseCaseResponse = Either<
  SolicitationNotFoundError | UnauthorizedSolicitationActionError,
  Solicitation
>

interface EditSolicitationUseCaseI {
  solicitationFormPayload: Partial<SolicitationForm>
  status: string
  profileId: string
  solicitationId: string
}
export class EditSolicitationFormUseCase {
  constructor(
    private solicitationRepository: ISolicitationRepository,
    private solicitationFormRepository: ISolicitationFormRepository,
    private budgetRepository: IBudgetRepository,
  ) {}

  async execute({
    solicitationFormPayload,
    status,
    profileId,
    solicitationId,
  }: EditSolicitationUseCaseI): Promise<EditSolicitationFormUseCaseResponse> {
    const solicitation =
      await this.solicitationRepository.findById(solicitationId)
    if (!solicitation) return left(new SolicitationNotFoundError())
    const budget = await this.budgetRepository.findByParam<{
      solicitationId: string
    }>({ solicitationId: solicitation.id.toString() })
    if (budget.length > 0 && status !== CANCELED_SOLICITATION_STATUS)
      return left(new ActionNotAllowedError())
    if (profileId !== solicitation.clientProfile.id.toString())
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
