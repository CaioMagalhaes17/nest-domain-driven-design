import { MessagesProducerGateway } from "../../gateways/messageries/messages-producer.gateway"
import { formatTopic } from "../../utils/formatTopic"

export class OnBudgetCreatedUseCase {
  constructor(private messagesProducerGateway: MessagesProducerGateway) {}

  async execute({
    clientProfileId,
    topic,
    price,
    email,
    storeName,
    budgetId,
    storeProfileImg,
    solicitationId,
  }: {
    clientProfileId: string
    topic: string
    price: string
    email: string
    storeName: string
    budgetId: string
    storeProfileImg: string
    solicitationId: string
  }) {
    await this.messagesProducerGateway.produce("onBudgetCreated", [
      {
        value: JSON.stringify({
          topic: formatTopic(topic),
          price,
          clientProfileId,
          email,
          storeName,
          budgetId,
          storeProfileImg,
          solicitationId,
        }),
      },
    ])
  }
}
