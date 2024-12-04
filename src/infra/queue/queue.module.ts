import { BullModule } from "@nestjs/bull"
import { Module } from "@nestjs/common"
import { SendEmailToStore } from "./notifications/send-email-to-store"

@Module({
  imports: [
    BullModule.registerQueue({
      name: "sendEmailToStore",
    }),
  ],
  providers: [SendEmailToStore],
  exports: [BullModule],
})
export class QueueModule {}
