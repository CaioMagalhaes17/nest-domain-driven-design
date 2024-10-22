export abstract class MessagesProducerGateway {
  abstract produce(topic: string, messages)
}
