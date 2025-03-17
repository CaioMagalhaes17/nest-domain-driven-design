import { BullModule } from "@nestjs/bull"
import { Module } from "@nestjs/common"
import { SendEmailToStore } from "./notifications/send-email-to-store"
import { SendNotificationToStore } from "./notifications/send-notification-to-store"

@Module({
  imports: [
    BullModule.registerQueue({
      name: "sendEmailToStore",
    }),
    BullModule.registerQueue({
      name: "sendNotificationToStore",
    }),
  ],
  providers: [SendEmailToStore, SendNotificationToStore],
  exports: [BullModule],
})
export class QueueModule {}
