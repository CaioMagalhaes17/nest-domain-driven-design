import { Either, left, right } from "src/core/Either"
import { BudgetRepository } from "../../repositories/repair/budget-repository"
import { BudgetNotFound } from "../../errors/repair/budget/BudgetNotFound"
import { Budget } from "src/domain/portal/enterprise/repair/budget"

type FetchBudgetUseCaseResponse = Either<
  BudgetNotFound,
  {
    budget: Budget[]
  }
>
export class FetchBudgetsUseCase {
  constructor(private budgetRepository: BudgetRepository) {}

  async execute(userId: number): Promise<FetchBudgetUseCaseResponse> {
    const budget = await this.budgetRepository.fetchByUser(userId)

    if (!budget) return left(new BudgetNotFound())

    return right({ budget })
  }
}
