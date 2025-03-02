import { InjectQueue } from "@nestjs/bull"
import { Injectable, OnModuleInit } from "@nestjs/common"
import { Queue } from "bull"
import { MessagesConsumerGateway } from "@/domain/portal/application/gateways/messageries/messages-consumer.gateway"
import { FetchStoreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/fetch-store-profile"

@Injectable()
export class SolicitationCreatedConsumer implements OnModuleInit {
  constructor(
    private readonly messagesConsumerGateway: MessagesConsumerGateway,
    private readonly fetchStoreProfileUseCase: FetchStoreProfileUseCase,
    @InjectQueue("sendEmailToStore") private emailQueue: Queue,
  ) {}

  async onModuleInit() {
    await this.messagesConsumerGateway.consume("stores", "storesInside", {
      eachMessage: async ({ message }) => {
        const stores = JSON.parse(message.value)
        stores.value.map(async (item) => {
          const fetchedUser = await this.fetchStoreProfileUseCase.execute(
            item.props.userId,
          )
          if (fetchedUser.isRight()) {
            const storeProfile = fetchedUser.value.profile
            await this.emailQueue.add({ email: storeProfile.email })
          }
        })
      },
    })
  }
}
