import { Either, left, right } from "src/core/Either"
import { BudgetRepository } from "../../repositories/repair/budget-repository"
import { BudgetNotFound } from "../../errors/repair/budget/BudgetNotFound"
import { Budget } from "src/domain/portal/enterprise/repair/budget"
import { BudgetActionNotAllowed } from "../../errors/repair/budget/BudgetActionNotAllowed"

type FetchBudgetUseCaseResponse = Either<
  BudgetNotFound | BudgetActionNotAllowed,
  {
    budget: Budget
  }
>
export class FetchBudgetUseCase {
  constructor(private budgetRepository: BudgetRepository) {}

  async execute(
    budgetId: number,
    userId: number,
  ): Promise<FetchBudgetUseCaseResponse> {
    const budget = await this.budgetRepository.fetchById(budgetId)

    if (!budget) return left(new BudgetNotFound())

    if (budget.userId !== userId) return left(new BudgetActionNotAllowed())

    return right({ budget })
  }
}
