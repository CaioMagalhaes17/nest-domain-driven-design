import { Either, left, right } from "src/core/Either"
import { IBudgetRepository } from "../../repositories/repair/budget-repository"
import { BudgetNotFound } from "../../errors/repair/budget/BudgetNotFound"
import { Budget } from "src/domain/portal/enterprise/repair/budget"

type FetchBudgetUseCaseResponse = Either<
  BudgetNotFound,
  {
    budget: Budget[]
  }
>
export class FetchBudgetsByStoreIdUseCase {
  constructor(private budgetRepository: IBudgetRepository) {}

  async execute(
    id: string,
    paginationObj?: { page: number; limit: number },
  ): Promise<FetchBudgetUseCaseResponse> {
    const budget = await this.budgetRepository.findByParam<{
      storeProfileId: string
    }>(
      {
        storeProfileId: id,
      },
      paginationObj,
    )
    if (!budget) return left(new BudgetNotFound())
    return right({ budget })
  }
}
