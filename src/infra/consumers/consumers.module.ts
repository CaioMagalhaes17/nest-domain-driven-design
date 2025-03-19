import { Module } from "@nestjs/common"
import { MessagesStreamingModule } from "../gateways/messageries/messages-streaming.module"
import { StoreProfileModule } from "../http/controllers/profile/store/store-profile.module"
import { QueueModule } from "../queue/queue.module"
import { SolicitationCreatedConsumer } from "./solicitation-created.consumer"
import { BudgetCreatedConsumer } from "./budget-created.consumer"

@Module({
  imports: [MessagesStreamingModule, StoreProfileModule, QueueModule],
  providers: [SolicitationCreatedConsumer, BudgetCreatedConsumer],
})
export class ConsumersModule {}
