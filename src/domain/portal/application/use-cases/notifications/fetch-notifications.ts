import { INotificationRepository } from "../../repositories/notification/notification.repository"

export class FetchNotificationsByProfileUseCase {
  constructor(private notificationsRepository: INotificationRepository) {}

  async execute(profileId: string) {
    return await this.notificationsRepository.findByParam<{
      profileId: string
    }>({ profileId })
  }
}
