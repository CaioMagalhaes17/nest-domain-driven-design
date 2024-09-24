import { FetchGeolocationCoveringStoreUseCase } from "../geolocation/fetch-geolocation-covering-use-case"
import { FetchGeolocationUseCase } from "../geolocation/fetch-geolocation-use-case"

export class FetchAvaliableSolicitationsToStoreUseCase {
  constructor(
    private fetchGeolocationCoveringStoreUseCase: FetchGeolocationCoveringStoreUseCase,
    private fetchGeolocationUseCase: FetchGeolocationUseCase,
  ) {}

  async execute(userId: number) {
    const storeGeolocation = await this.fetchGeolocationUseCase.execute(userId)
    if (storeGeolocation.isRight()) {
      const covering = await this.fetchGeolocationCoveringStoreUseCase.execute({
        latitude: storeGeolocation.value.geolocation.latitude,
        longitude: storeGeolocation.value.geolocation.longitude,
      })
      return covering
    }
  }
}
