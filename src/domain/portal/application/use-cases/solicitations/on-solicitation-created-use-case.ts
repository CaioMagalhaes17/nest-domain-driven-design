import { EventStreamingGateway } from "../../gateway/event-streaming/event-streaming.gateway"
import { FetchGeolocationUseCase } from "../geolocation/fetch-geolocation-use-case"
import { FetchStoresInsideRadiusUseCase } from "../geolocation/fetch-stores-inside-radius-use-case"

interface OnSolicitationCreatedUseCaseInterface {
  userId: number
  solicitationId: number
}

export class OnSolicitationCreatedUseCase {
  constructor(
    private eventStreamingGateway: EventStreamingGateway,
    private fetchStoresInsideRadiusUseCase: FetchStoresInsideRadiusUseCase,
    private fetchGeolocationUseCase: FetchGeolocationUseCase,
  ) {}

  async execute({
    solicitationId,
    userId,
  }: OnSolicitationCreatedUseCaseInterface) {
    const userLocation = await this.fetchGeolocationUseCase.execute(userId)
    if (userLocation.isRight()) {
      const storesInsideUserLocation =
        await this.fetchStoresInsideRadiusUseCase.execute({
          latitude: userLocation.value.geolocation.latitude,
          longitude: userLocation.value.geolocation.longitude,
          radius: userLocation.value.geolocation.radius,
        })
      console.log(storesInsideUserLocation)
    }
  }
}
