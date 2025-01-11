import { Module } from "@nestjs/common"
import { SolicitationCreatedConsumer } from "./solicitation-created.consumer"
import { MessagesStreamingModule } from "src/infra/gateways/messageries/messages-streaming.module"
import { StoreProfileModule } from "src/infra/http/controllers/profile/store/store-profile.module"
import { QueueModule } from "src/infra/queue/queue.module"

@Module({
  imports: [MessagesStreamingModule, StoreProfileModule, QueueModule],
  providers: [SolicitationCreatedConsumer],
})
export class SolicitationsConsumerModule {}
