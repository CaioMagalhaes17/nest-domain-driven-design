import { Either, left, right } from "src/core/Either"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { Solicitation } from "src/domain/portal/enterprise/repair/solicitation"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { FetchClientsInsideStoreLocationUseCase } from "../geolocation/fetch-clients-inside-store-location-use-case"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"

type FetchSolicitationsUseCaseResponse = Either<
  SolicitationNotFoundError | GeolocationNotFound,
  { clientProfile: string; solicitations: Solicitation[] }[]
>

export class FetchAvaliableSolicitationsToStoreUseCase {
  constructor(
    private solicitationRepository: ISolicitationRepository,
    private fetchClientsInsideStoreLocationUseCase: FetchClientsInsideStoreLocationUseCase,
  ) {}

  async execute(profileId: string): Promise<FetchSolicitationsUseCaseResponse> {
    const clientsProfile =
      await this.fetchClientsInsideStoreLocationUseCase.execute(profileId)
    if (clientsProfile.isLeft()) return left(new GeolocationNotFound())
    if (clientsProfile.isRight) {
      const solicitations = await Promise.all(
        clientsProfile.value.map(async (item) => {
          const solicitations = await this.solicitationRepository.findByParam<{
            clientProfile: string
          }>({
            clientProfile: item._id,
          })
          return { clientProfile: item._id, solicitations }
        }),
      )
      return right(solicitations)
    }
  }
}
