import { Either, left } from "src/core/Either"
import { IBudgetRepository } from "../../repositories/repair/budget-repository"
import { BudgetNotFound } from "../../errors/repair/budget/BudgetNotFound"
import { BudgetActionNotAllowed } from "../../errors/repair/budget/BudgetActionNotAllowed"

type DeleteBudgetUseCaseResponse = Either<
  BudgetNotFound | BudgetActionNotAllowed,
  void
>
export class DeleteBudgetUseCase {
  constructor(private budgetRepository: IBudgetRepository) {}

  async execute(
    budgetId: string,
    storeProfile: string,
  ): Promise<DeleteBudgetUseCaseResponse> {
    const budget = await this.budgetRepository.findById(budgetId)

    if (!budget) return left(new BudgetNotFound())

    if (budget.storeProfile.id.toString() !== storeProfile)
      return left(new BudgetActionNotAllowed())

    await this.budgetRepository.deleteById(budgetId)
  }
}
