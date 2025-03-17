import { INotificationRepository } from "@/domain/portal/application/repositories/notification/notification.repository"
import { SaveNotificationUseCase } from "@/domain/portal/application/use-cases/notifications/save-notification"
import { NotificationMongoModule } from "@/infra/databases/mongo/notification.module"
import { InfraNotificationRepository } from "@/infra/databases/mongo/repositories/notification/notification.repository"
import { Module } from "@nestjs/common"

@Module({
  controllers: [],
  imports: [NotificationMongoModule],
  providers: [
    {
      provide: SaveNotificationUseCase,
      useFactory: (notificationRepository: INotificationRepository) => {
        return new SaveNotificationUseCase(notificationRepository)
      },
      inject: [InfraNotificationRepository],
    },
  ],
  exports: [SaveNotificationUseCase],
})
export class NotificationModule {}
