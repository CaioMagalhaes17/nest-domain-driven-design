import { NotificationBody } from "@/domain/portal/enterprise/notification/notification.entity"
import { INotificationRepository } from "../../repositories/notification/notification.repository"

export class SaveNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(data: Partial<NotificationBody>) {
    const notificationId = await this.notificationRepository.create(data)
    const notification = await this.notificationRepository.findById(
      notificationId.id,
    )
    return notification
  }
}
