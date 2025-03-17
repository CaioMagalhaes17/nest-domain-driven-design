import { Module } from "@nestjs/common"
import { WebsocketGateway as InfraWebsocketGateway } from "./websocket.gateway"
import { WebsocketGateway } from "@/domain/portal/application/gateways/websocket/websocket.gateway"

@Module({
  providers: [
    {
      provide: WebsocketGateway,
      useClass: InfraWebsocketGateway,
    },
  ],
  exports: [WebsocketGateway],
})
export class WebsocketModule {}
