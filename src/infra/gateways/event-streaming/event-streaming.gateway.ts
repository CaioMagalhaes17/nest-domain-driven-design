import { Kafka } from "kafkajs"
import { EventStreamingGateway } from "src/domain/portal/application/gateway/event-streaming/event-streaming.gateway"

export class InfraEventStreamingGateway extends EventStreamingGateway {
  async eventStreamingProducer(clientId: string, brokers: string[]) {
    const kafka = new Kafka({
      clientId,
      brokers,
    })

    const producer = kafka.producer()
    await producer.connect()
    return producer
  }

  async eventStreamingConsumer(
    clientId: string,
    brokers: string[],
    topicId: string,
  ) {
    const kafka = new Kafka({
      clientId,
      brokers,
    })

    const consumer = kafka.consumer({ groupId: "group-test" })
    await consumer.connect()
    await consumer.subscribe({ topic: topicId, fromBeginning: true })

    return consumer
  }
}
