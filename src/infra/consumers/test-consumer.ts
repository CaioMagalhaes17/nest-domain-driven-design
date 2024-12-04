import { Injectable, OnModuleInit } from "@nestjs/common"
import { MessagesConsumerGateway } from "src/domain/portal/application/gateway/messageries/messages-consumer.gateway"

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(
    private readonly messagesConsumerGateway: MessagesConsumerGateway,
  ) {}

  async onModuleInit() {
    // await this.messagesConsumerGateway.consume(
    //   "teste9998",
    //   "solicitationCreated",
    //   {
    //     eachMessage: async ({ topic, partition, message }) => {
    //       console.log("oioi", partition, message.value.toString())
    //     },
    //   },
    // )
  }
}
