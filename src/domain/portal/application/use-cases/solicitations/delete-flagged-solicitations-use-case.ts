import { IBudgetRepository } from "../../repositories/repair/budget-repository"
import { ISolicitationFormRepository } from "../../repositories/repair/solicitation-form.repository.interface"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { CANCELED_SOLICITATION_STATUS } from "../../constants/solicitation-status"

export class DeleteFlaggedSolicitationsUseCase {
  constructor(
    private solicitationRepository: ISolicitationRepository,
    private solicitationFormRepository: ISolicitationFormRepository,
    private budgetRepository: IBudgetRepository,
  ) {}
  async execute() {
    const solicitation = await this.solicitationRepository.findByParam<{
      status: string
    }>({ status: CANCELED_SOLICITATION_STATUS })
    if (solicitation.length === 0)
      return console.log("0 solicitations to delete")
    await Promise.all(
      solicitation.map(async (item) => {
        const budget = await this.budgetRepository.findByParam<{
          solicitationId: string
        }>({
          solicitationId: item.id,
        })
        if (budget.length > 0) {
          await this.budgetRepository.deleteById(budget[0].id)
        }
        await this.solicitationFormRepository.deleteById(item.form.id)
        await this.solicitationRepository.deleteById(item.id)
      }),
    )
  }
}
