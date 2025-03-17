import { Module } from "@nestjs/common"
import { getModelToken, MongooseModule } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { InfraNotificationRepository } from "./repositories/notification/notification.repository"
import {
  NotificationSchema,
  Notification,
} from "./schemas/notification/notification.schema"
import { NotificationMapper } from "./mappers/notification/notification.mapper"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [
    NotificationMapper,
    {
      provide: InfraNotificationRepository,
      useFactory: (model: Model<Notification>, mapper: NotificationMapper) => {
        return new InfraNotificationRepository(model, mapper)
      },
      inject: [getModelToken(Notification.name), NotificationMapper],
    },
  ],
  exports: [InfraNotificationRepository],
})
export class NotificationMongoModule {}
