import { MessagesProducerGateway } from "../../gateway/messageries/messages-producer.gateway"
import { FetchGeolocationUseCase } from "../geolocation/fetch-geolocation-use-case"
import { FetchStoresInsideRadiusUseCase } from "../geolocation/fetch-stores-inside-radius-use-case"

export class OnSolicitationCreatedUseCase {
  constructor(
    private messagesProducerGateway: MessagesProducerGateway,
    private fetchStoresInsideRadiusUseCase: FetchStoresInsideRadiusUseCase,
    private fetchGeolocationUseCase: FetchGeolocationUseCase,
  ) {}

  async execute(userId: number) {
    const userLocation = await this.fetchGeolocationUseCase.execute(userId)
    if (userLocation.isRight()) {
      const storesInsideUserLocation =
        await this.fetchStoresInsideRadiusUseCase.execute({
          latitude: userLocation.value.geolocation.latitude,
          longitude: userLocation.value.geolocation.longitude,
          radius: userLocation.value.geolocation.radius,
        })
      this.messagesProducerGateway.produce("stores", [
        { value: JSON.stringify(storesInsideUserLocation) },
      ])
    }
  }
}
