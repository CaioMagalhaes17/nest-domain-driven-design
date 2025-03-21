import { Either, left, right } from "src/core/Either"
import { IBudgetRepository } from "../../repositories/repair/budget-repository"
import { BudgetNotFound } from "../../errors/repair/budget/BudgetNotFound"
import { Budget } from "src/domain/portal/enterprise/repair/budget"
import { BudgetActionNotAllowed } from "../../errors/repair/budget/BudgetActionNotAllowed"
import { FetchStoreDistanceFromClientUseCase } from "../geolocation/fetch-store-distance-from-client"
import { FetchGeolocationUseCase } from "../geolocation/fetch-geolocation-use-case"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"

type FetchBudgetUseCaseResponse = Either<
  BudgetNotFound | BudgetActionNotAllowed,
  {
    budget: Budget
    distance?: number
  }
>
export class FetchBudgetUseCase {
  constructor(
    private budgetRepository: IBudgetRepository,
    private fetchStoreDistance: FetchStoreDistanceFromClientUseCase,
    private fetchClientGeolocation: FetchGeolocationUseCase,
  ) {}

  async execute(
    budgetId: string,
    clientProfileId?: string,
  ): Promise<FetchBudgetUseCaseResponse> {
    const budget = await this.budgetRepository.findById(budgetId)

    if (!budget) return left(new BudgetNotFound())
    if (clientProfileId) {
      const location =
        await this.fetchClientGeolocation.execute(clientProfileId)
      if (location.isLeft()) return left(new GeolocationNotFound())
      const distance = await this.fetchStoreDistance.execute(
        location.value[0].latitude,
        location.value[0].longitude,
        location.value[0].radius,
        budget.storeProfile.id.toString(),
      )
      return right({ budget, distance })
    }
    return right({ budget })
  }
}
