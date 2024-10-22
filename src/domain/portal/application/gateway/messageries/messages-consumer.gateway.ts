export abstract class MessagesConsumerGateway {
  abstract consume(topic: string, config)
}
