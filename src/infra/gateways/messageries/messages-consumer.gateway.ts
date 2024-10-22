import { Kafka } from "kafkajs"
import { MessagesConsumerGateway } from "src/domain/portal/application/gateway/messageries/messages-consumer.gateway"

export class InfraMessagesConsumerGateway extends MessagesConsumerGateway {
  private brokers = ["localhost:9092"]

  private readonly kafkaConsumer = new Kafka({
    brokers: this.brokers,
  })

  async consume(topic: string, config) {
    const consumer = this.kafkaConsumer.consumer({ groupId: "nestjs-kafka" })
    await consumer.connect()
    await consumer.subscribe({ topic })
    await consumer.run(config)
  }
}
