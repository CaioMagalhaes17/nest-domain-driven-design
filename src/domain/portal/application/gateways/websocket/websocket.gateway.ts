import { NotificationBody } from "@/domain/portal/enterprise/notification/notification.entity"

export abstract class WebsocketGateway {
  abstract sendNotification({
    profileId,
    notificationBody,
  }: {
    profileId: string
    notificationBody: NotificationBody
  })
}
