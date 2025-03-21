import { Either, left, right } from "src/core/Either"
import { IBudgetRepository } from "../../repositories/repair/budget-repository"
import { BudgetNotFound } from "../../errors/repair/budget/BudgetNotFound"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { FetchStoreDistanceFromClientUseCase } from "../geolocation/fetch-store-distance-from-client"
import { FetchGeolocationUseCase } from "../geolocation/fetch-geolocation-use-case"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"

type FetchBudgetUseCaseResponse = Either<
  BudgetNotFound | GeolocationNotFound,
  any
>
export class FetchBudgetsToClientUseCase {
  constructor(
    private solicitationRepository: ISolicitationRepository,
    private budgetRepository: IBudgetRepository,
    private fetchStoreDistanceFromClientUseCase: FetchStoreDistanceFromClientUseCase,
    private fetchGeolocationUseCase: FetchGeolocationUseCase,
  ) {}

  async execute(
    clientProfileId: string,
    paginationObj?: { page: number; limit: number },
  ): Promise<FetchBudgetUseCaseResponse> {
    const clientGeolocation =
      await this.fetchGeolocationUseCase.execute(clientProfileId)
    if (clientGeolocation.isLeft()) return left(new GeolocationNotFound())
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
    const allBudgets = budgets.filter(Boolean).flat()

    const allStoresId = allBudgets.map((budget) => budget.storeProfile.id)
    const uniqueStoresIds = [
      ...new Map(allStoresId.map((obj) => [obj.toString(), obj])).values(),
    ]

    const distances = await Promise.all(
      uniqueStoresIds.map(async (storeId) => {
        const result = await this.fetchStoreDistanceFromClientUseCase.execute(
          clientGeolocation.value[0].latitude,
          clientGeolocation.value[0].longitude,
          clientGeolocation.value[0].radius,
          storeId.toString(),
        )
        return { storeProfileId: storeId, distance: result }
      }),
    )

    return right({ distances, budgets: allBudgets })
  }
}
