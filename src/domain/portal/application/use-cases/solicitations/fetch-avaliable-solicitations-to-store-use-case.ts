import { Either, left, right } from "src/core/Either"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { Solicitation } from "src/domain/portal/enterprise/repair/solicitation"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { FetchClientsInsideStoreLocationUseCase } from "../geolocation/fetch-clients-inside-store-location-use-case"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"

type FetchSolicitationsUseCaseResponse = Either<
  SolicitationNotFoundError | GeolocationNotFound,
  { userId: string; solicitations: Solicitation[] }[]
>

export class FetchAvaliableSolicitationsToStoreUseCase {
  constructor(
    private solicitationRepository: ISolicitationRepository,
    private fetchClientsInsideStoreLocationUseCase: FetchClientsInsideStoreLocationUseCase,
  ) {}

  async execute(userId: string): Promise<FetchSolicitationsUseCaseResponse> {
    const clientsProfile =
      await this.fetchClientsInsideStoreLocationUseCase.execute(userId)
    if (clientsProfile.isLeft()) return left(new GeolocationNotFound())
    if (clientsProfile.isRight) {
      const solicitations = await Promise.all(
        clientsProfile.value.map(async (item) => {
          const solicitations = await this.solicitationRepository.findByParam<{
            userId: string
          }>({
            userId: item.userId,
          })
          return { userId: item.userId, solicitations }
        }),
      )
      return right(solicitations)
    }
  }
}
