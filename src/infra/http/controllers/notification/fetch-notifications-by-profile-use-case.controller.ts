import { FetchNotificationsByProfileUseCase } from "@/domain/portal/application/use-cases/notifications/fetch-notifications"
import { JwtAuthGuard } from "@/infra/auth/guards/jwt.guard"
import { NotificationPresenter } from "@/infra/presenters/notification/notification.presenter"
import { Controller, Get, Req, UseGuards } from "@nestjs/common"

@Controller()
export class FetchNotificationsByProfileUseCaseController {
  constructor(
    private fetchNotificationsByProfileUseCase: FetchNotificationsByProfileUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("/notifications")
  async handle(@Req() req: { user: { profileId: string } }) {
    const notifications = await this.fetchNotificationsByProfileUseCase.execute(
      req.user.profileId,
    )
    if (notifications.length === 0) return []
    const formated = notifications.map((notification) =>
      NotificationPresenter.toHttp(notification),
    )
    return formated
  }
}
