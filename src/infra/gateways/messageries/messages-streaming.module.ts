import { Module } from "@nestjs/common"
import { InfraMessagesConsumerGateway } from "./messages-consumer.gateway"
import { MessagesConsumerGateway } from "src/domain/portal/application/gateway/messageries/messages-consumer.gateway"
import { MessagesProducerGateway } from "src/domain/portal/application/gateway/messageries/messages-producer.gateway"
import { InfraMessagesProducerGateway } from "./messages-producer.gateway"

@Module({
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
