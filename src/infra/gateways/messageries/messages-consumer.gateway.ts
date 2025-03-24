import { Kafka } from "kafkajs"
import { MessagesConsumerGateway } from "@/domain/portal/application/gateways/messageries/messages-consumer.gateway"
import { ConfigService } from "@nestjs/config"

export class InfraMessagesConsumerGateway extends MessagesConsumerGateway {
  private brokers = ["redpanda:29092"]

  private readonly kafkaConsumer = new Kafka({
    brokers: this.brokers,
  })

  private readonly configService: ConfigService = new ConfigService()

  async consume(topic: string, groupId: string, config) {
    const consumer = this.kafkaConsumer.consumer({
      groupId,
      heartbeatInterval: 10000, // should be lower than sessionTimeout
      sessionTimeout: 60000,
    })

    if (this.configService.get<string>("USE_KAFKA") === "true") {
      await consumer.connect()
      await consumer.subscribe({ topic })
      await consumer.run(config)
    }
  }
}
