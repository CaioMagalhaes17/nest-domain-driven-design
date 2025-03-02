export abstract class MessagesConsumerGateway {
  abstract consume(topic: string, groupId: string, config)
}
