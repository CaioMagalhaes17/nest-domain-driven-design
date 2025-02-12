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
export class FetchStoreBudgetBySolicitationUseCase {
  constructor(private budgetRepository: IBudgetRepository) {}

  async execute(
    profileId: string,
    solicitationId: string,
  ): Promise<FetchBudgetUseCaseResponse> {
    const budget = await this.budgetRepository.findByParam<{
      solicitationId: string
      storeProfileId: string
    }>({
      solicitationId,
      storeProfileId: profileId,
    })
    if (!budget) return left(new BudgetNotFound())

    return right({ budget })
  }
}
