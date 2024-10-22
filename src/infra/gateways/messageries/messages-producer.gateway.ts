import { OnModuleInit } from "@nestjs/common"
import { Kafka, Producer } from "kafkajs"
import { MessagesProducerGateway } from "src/domain/portal/application/gateway/messageries/messages-producer.gateway"

export class InfraMessagesProducerGateway
  extends MessagesProducerGateway
  implements OnModuleInit
{
  private brokers = ["localhost:9092"]

  private readonly kafkaProducer = new Kafka({
    brokers: this.brokers,
  })

  private readonly producer: Producer = this.kafkaProducer.producer()

  async onModuleInit() {
    await this.producer.connect()
  }

  async produce(topic: string, messages) {
    await this.producer.send({ topic, messages })
  }
}
