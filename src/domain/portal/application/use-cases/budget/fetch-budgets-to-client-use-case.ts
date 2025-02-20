import { Either, right } from "src/core/Either"
import { IBudgetRepository } from "../../repositories/repair/budget-repository"
import { BudgetNotFound } from "../../errors/repair/budget/BudgetNotFound"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"

type FetchBudgetUseCaseResponse = Either<BudgetNotFound, any>
export class FetchBudgetsToClientUseCase {
  constructor(
    private solicitationRepository: ISolicitationRepository,
    private budgetRepository: IBudgetRepository,
  ) {}

  async execute(
    clientProfileId: string,
    paginationObj?: { page: number; limit: number },
  ): Promise<FetchBudgetUseCaseResponse> {
    const solicitations = await this.solicitationRepository.findByParam<{
      clientProfileId: string
    }>({ clientProfileId })
    const budgets = await Promise.all(
      solicitations.map(async (solicitation) => {
        const budget = await this.budgetRepository.findByParam<{
          solicitationId: string
        }>(
          {
            solicitationId: solicitation.id,
          },
          paginationObj,
        )
        if (budget.length > 0) return budget
      }),
    )
    const teste = budgets.filter(Boolean).flat()

    return right(teste)
  }
}
