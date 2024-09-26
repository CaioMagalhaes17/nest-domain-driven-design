import { Module } from "@nestjs/common"
import { EventStreamingGateway } from "src/domain/portal/application/gateway/event-streaming/event-streaming.gateway"
import { InfraEventStreamingGateway } from "./event-streaming.gateway"

@Module({
  providers: [
    {
      provide: EventStreamingGateway,
      useClass: InfraEventStreamingGateway,
    },
  ],
  exports: [EventStreamingGateway],
})
export class EventStreamingModule {}
