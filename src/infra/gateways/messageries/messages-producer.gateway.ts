import { OnModuleInit } from "@nestjs/common"
import { Kafka, Producer } from "kafkajs"
import { MessagesProducerGateway } from "@/domain/portal/application/gateways/messageries/messages-producer.gateway"
import { ConfigService } from "@nestjs/config"

export class InfraMessagesProducerGateway
  extends MessagesProducerGateway
  implements OnModuleInit {
  private brokers = ["redpanda:29092"]

  private readonly kafkaProducer = new Kafka({
    brokers: this.brokers,
  })

  private readonly configService: ConfigService = new ConfigService()

  private readonly producer: Producer = this.kafkaProducer.producer()

  async onModuleInit() {
    if (this.configService.get<string>("USE_KAFKA") === "true") {
      await this.producer.connect()
    }
  }

  async produce(topic: string, messages) {
    await this.producer.send({ topic, messages })
  }
}
