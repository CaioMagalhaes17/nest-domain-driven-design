import { MessagesProducerGateway } from "../../gateways/messageries/messages-producer.gateway"
import { formatTopic } from "../../utils/formatTopic"
import { FetchStoresInsideClientRadiusUseCase } from "../geolocation/fetch-stores-inside-client-radius-use-case"

export class OnSolicitationCreatedUseCase {
  constructor(
    private messagesProducerGateway: MessagesProducerGateway,
    private fetchStoresInsideRadiusUseCase: FetchStoresInsideClientRadiusUseCase,
  ) {}

  async execute({
    profileId,
    topic,
    solicitationId,
    timePreference,
    name,
  }: {
    profileId: string
    topic: string
    solicitationId: string
    timePreference: string
    name: string
  }) {
    const storesInsideUserLocation =
      await this.fetchStoresInsideRadiusUseCase.execute(profileId)
    if (storesInsideUserLocation.isRight()) {
      await this.messagesProducerGateway.produce("stores", [
        {
          value: JSON.stringify({
            topic: formatTopic(topic),
            nearStores: storesInsideUserLocation.value,
            solicitationId,
            timePreference,
            name,
          }),
        },
      ])
    }
  }
}
