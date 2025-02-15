import { Either, left, right } from "src/core/Either"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { Solicitation } from "src/domain/portal/enterprise/repair/solicitation"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { FetchClientsInsideStoreLocationUseCase } from "../geolocation/fetch-clients-inside-store-location-use-case"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"
import { OPEN_TO_BUDGETS_SOLICITATION_STATUS } from "../../constants/solicitation-status"
import { IBudgetRepository } from "../../repositories/repair/budget-repository"

type FetchSolicitationsUseCaseResponse = Either<
  SolicitationNotFoundError | GeolocationNotFound,
  Solicitation[]
>

export class FetchAvaliableSolicitationsToStoreUseCase {
  constructor(
    private solicitationRepository: ISolicitationRepository,
    private fetchClientsInsideStoreLocationUseCase: FetchClientsInsideStoreLocationUseCase,
    private budgetRepository: IBudgetRepository,
  ) {}

  async execute(profileId: string): Promise<FetchSolicitationsUseCaseResponse> {
    const clientsProfile =
      await this.fetchClientsInsideStoreLocationUseCase.execute(profileId)
    const budgets = await this.budgetRepository.findByParam<{
      storeProfileId: string
    }>({
      storeProfileId: profileId,
    })
    const IdsProibidos = budgets.map((budget) =>
      budget.solicitation.id.toString(),
    )
    if (clientsProfile.isLeft()) return left(new GeolocationNotFound())
    if (clientsProfile.isRight()) {
      const solicitations = await Promise.all(
        clientsProfile.value.map(async (item) => {
          const solicitations = await this.solicitationRepository.findByParam<{
            clientProfileId: string
          }>({
            clientProfileId: item.profileId,
          })
          const solicitationsWithoutBudget = await Promise.all(
            solicitations.map(async (solicitation) => {
              if (!IdsProibidos.includes(solicitation.id.toString())) {
                return solicitation
              }
              return null
            }),
          )
          const filteredSolicitations =
            solicitationsWithoutBudget.filter(Boolean)

          return filteredSolicitations.filter(
            (item) => item.status === OPEN_TO_BUDGETS_SOLICITATION_STATUS,
          )
          // return solicitations.filter((item) => {
          //   return item.status === OPEN_TO_BUDGETS_SOLICITATION_STATUS
          // })
        }),
      )

      return right(solicitations.flat())
    }
  }
}
