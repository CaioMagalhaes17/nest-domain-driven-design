import { InjectQueue } from "@nestjs/bull"
import { Injectable, OnModuleInit } from "@nestjs/common"
import { Queue } from "bull"
import { MessagesConsumerGateway } from "@/domain/portal/application/gateways/messageries/messages-consumer.gateway"

@Injectable()
export class SolicitationCreatedConsumer implements OnModuleInit {
  constructor(
    private readonly messagesConsumerGateway: MessagesConsumerGateway,
    @InjectQueue("sendEmailToStore") private emailQueue: Queue,
    @InjectQueue("sendSolicitationCreatedToStore")
    private sendSolicitationCreatedToStore: Queue,
  ) {}

  async onModuleInit() {
    await this.messagesConsumerGateway.consume("stores", "storesInside", {
      eachMessage: async ({ message }) => {
        const { topic, nearStores, solicitationId, timePreference, name } =
          JSON.parse(message.value)
        nearStores.map(async (store) => {
          console.log(store.profile._id, store.profile.props)
          const storeProfile = store.profile.props
          await this.emailQueue.add({ email: storeProfile.email })
          await this.sendSolicitationCreatedToStore.add({
            topic,
            solicitationId,
            timePreference,
            name,
            storeId: store.profile._id,
          })
        })
      },
    })
  }
}
