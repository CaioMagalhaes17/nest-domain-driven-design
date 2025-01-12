import { Either, left, right } from "src/core/Either"
import { IBudgetRepository } from "../../repositories/repair/budget-repository"
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
  constructor(private budgetRepository: IBudgetRepository) {}

  async execute(
    budgetId: string,
    storeProfileId: string,
  ): Promise<FetchBudgetUseCaseResponse> {
    const budget = await this.budgetRepository.findById(budgetId)

    if (!budget) return left(new BudgetNotFound())
    if (budget.storeProfile.id.toString() !== storeProfileId)
      return left(new BudgetActionNotAllowed())
    return right({ budget })
  }
}
