import { BullModule } from "@nestjs/bull"
import { Module } from "@nestjs/common"
import { SendEmailToStore } from "./notifications/send-email-to-store"
import { SendSolicitationCreatedToStore } from "./notifications/send-solicitation-created-to-store"
import { SaveNotificationUseCase } from "@/domain/portal/application/use-cases/notifications/save-notification"
import { NotificationModule } from "../http/controllers/notification/notification.module"
import { WebsocketGateway } from "@/domain/portal/application/gateways/websocket/websocket.gateway"
import { WebsocketModule } from "../gateways/websocket/websocket.module"
import { SendBudgetCreatedToStore } from "./notifications/send-budget-created"

@Module({
  imports: [
    BullModule.registerQueue({
      name: "sendEmailToStore",
    }),
    BullModule.registerQueue({
      name: "sendSolicitationCreatedToStore",
    }),
    BullModule.registerQueue({
      name: "sendBudgetCreatedToStore",
    }),
    NotificationModule,
    WebsocketModule,
  ],
  providers: [
    SendEmailToStore,
    {
      provide: SendSolicitationCreatedToStore,
      useFactory: (
        saveNotificationUseCase: SaveNotificationUseCase,
        websocketGateway: WebsocketGateway,
      ) => {
        return new SendSolicitationCreatedToStore(
          saveNotificationUseCase,
          websocketGateway,
        )
      },
      inject: [SaveNotificationUseCase, WebsocketGateway],
    },
    {
      provide: SendBudgetCreatedToStore,
      useFactory: (
        saveNotificationUseCase: SaveNotificationUseCase,
        websocketGateway: WebsocketGateway,
      ) => {
        return new SendBudgetCreatedToStore(
          saveNotificationUseCase,
          websocketGateway,
        )
      },
      inject: [SaveNotificationUseCase, WebsocketGateway],
    },
  ],
  exports: [BullModule],
})
export class QueueModule {}
