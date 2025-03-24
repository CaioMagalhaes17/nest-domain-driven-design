import { Kafka } from "kafkajs"
import { MessagesConsumerGateway } from "@/domain/portal/application/gateways/messageries/messages-consumer.gateway"

export class InfraMessagesConsumerGateway extends MessagesConsumerGateway {
  private brokers = ["redpanda:29092"]

  private readonly kafkaConsumer = new Kafka({
    brokers: this.brokers,
  })

  async consume(topic: string, groupId: string, config) {
    const consumer = this.kafkaConsumer.consumer({
      groupId,
      heartbeatInterval: 10000, // should be lower than sessionTimeout
      sessionTimeout: 60000,
    })
    await consumer.connect()
    await consumer.subscribe({ topic })
    await consumer.run(config)
  }
}
