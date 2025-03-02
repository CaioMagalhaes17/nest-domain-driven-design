import { MessagesProducerGateway } from "../../gateways/messageries/messages-producer.gateway"
import { FetchStoresInsideClientRadiusUseCase } from "../geolocation/fetch-stores-inside-client-radius-use-case"

export class OnSolicitationCreatedUseCase {
  constructor(
    private messagesProducerGateway: MessagesProducerGateway,
    private fetchStoresInsideRadiusUseCase: FetchStoresInsideClientRadiusUseCase,
  ) {}

  async execute(userId: string) {
    const storesInsideUserLocation =
      await this.fetchStoresInsideRadiusUseCase.execute(userId)
    if (storesInsideUserLocation.isRight()) {
      await this.messagesProducerGateway.produce("stores", [
        { value: JSON.stringify(storesInsideUserLocation) },
      ])
    }
  }
}
