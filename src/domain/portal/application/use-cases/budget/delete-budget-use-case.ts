import { Either, left } from "src/core/Either"
import { BudgetRepository } from "../../repositories/repair/budget-repository"
import { BudgetNotFound } from "../../errors/repair/budget/BudgetNotFound"
import { BudgetActionNotAllowed } from "../../errors/repair/budget/BudgetActionNotAllowed"

type DeleteBudgetUseCaseResponse = Either<
  BudgetNotFound | BudgetActionNotAllowed,
  void
>
export class DeleteBudgetUseCase {
  constructor(private budgetRepository: BudgetRepository) {}

  async execute(
    budgetId: number,
    userId: number,
  ): Promise<DeleteBudgetUseCaseResponse> {
    const budget = await this.budgetRepository.fetchById(budgetId)

    if (!budget) return left(new BudgetNotFound())

    if (budget.userId !== userId) return left(new BudgetActionNotAllowed())

    await this.budgetRepository.delete(budgetId)
  }
}
