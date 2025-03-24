import { Module } from "@nestjs/common"
import { InfraMessagesConsumerGateway } from "./messages-consumer.gateway"
import { MessagesConsumerGateway } from "@/domain/portal/application/gateways/messageries/messages-consumer.gateway"
import { MessagesProducerGateway } from "@/domain/portal/application/gateways/messageries/messages-producer.gateway"
import { InfraMessagesProducerGateway } from "./messages-producer.gateway"
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: MessagesConsumerGateway,
      useClass: InfraMessagesConsumerGateway,
    },
    {
      provide: MessagesProducerGateway,
      useClass: InfraMessagesProducerGateway,
    },
  ],
  exports: [MessagesConsumerGateway, MessagesProducerGateway],
})
export class MessagesStreamingModule {}
