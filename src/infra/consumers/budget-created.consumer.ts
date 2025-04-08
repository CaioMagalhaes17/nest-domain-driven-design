import { InjectQueue } from "@nestjs/bull"
import { Injectable, OnModuleInit } from "@nestjs/common"
import { Queue } from "bull"
import { MessagesConsumerGateway } from "@/domain/portal/application/gateways/messageries/messages-consumer.gateway"

@Injectable()
export class BudgetCreatedConsumer implements OnModuleInit {
  constructor(
    private readonly messagesConsumerGateway: MessagesConsumerGateway,
    @InjectQueue("sendEmailToStore") private emailQueue: Queue,
    @InjectQueue("sendBudgetCreatedToStore")
    private sendBudgetCreatedToStore: Queue,
  ) {}

  async onModuleInit() {
    await this.messagesConsumerGateway.consume("onBudgetCreated", "toClient", {
      eachMessage: async ({ message }) => {
        const {
          topic,
          price,
          clientProfileId,
          storeName,
          email,
          budgetId,
          storeProfileImg,
          solicitationId,
        } = JSON.parse(message.value)
        await this.emailQueue.add({ email })
        await this.sendBudgetCreatedToStore.add({
          topic,
          price,
          clientProfileId,
          storeName,
          budgetId,
          storeProfileImg,
          solicitationId,
        })
      },
    })
  }
}
