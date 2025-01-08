import { MessagesProducerGateway } from "../../gateway/messageries/messages-producer.gateway"
import { FetchGeolocationUseCase } from "../geolocation/fetch-geolocation-use-case"
import { FetchStoresInsideClientRadiusUseCase } from "../geolocation/fetch-stores-inside-client-radius-use-case"

export class OnSolicitationCreatedUseCase {
  constructor(
    private messagesProducerGateway: MessagesProducerGateway,
    private fetchStoresInsideRadiusUseCase: FetchStoresInsideClientRadiusUseCase,
    private fetchGeolocationUseCase: FetchGeolocationUseCase,
  ) {}

  async execute(userId: string) {
    const userLocation = await this.fetchGeolocationUseCase.execute(userId)
    if (userLocation.isRight()) {
      const storesInsideUserLocation =
        await this.fetchStoresInsideRadiusUseCase.execute(userId)
      this.messagesProducerGateway.produce("stores", [
        { value: JSON.stringify(storesInsideUserLocation) },
      ])
    }
  }
}
