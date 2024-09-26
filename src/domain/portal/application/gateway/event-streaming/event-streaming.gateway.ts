export abstract class EventStreamingGateway {
  abstract eventStreamingProducer(clientId: string, brokers: string[])
  abstract eventStreamingConsumer(
    clientId: string,
    brokers: string[],
    groupId: string,
  )
}
