import { NotificationBody } from "@/domain/portal/enterprise/notification/notification.entity"
import * as dayjs from "dayjs"

export class NotificationPresenter {
  static toHttp(notification: NotificationBody) {
    console.log(dayjs)
    return {
      id: notification.id,
      message: notification.message,
      profileId: notification.profileId,
      senderName: notification.senderName,
      type: notification.type,
      createdAt: dayjs(notification.createdAt).format("DD/MM/YYYY"),
    }
  }
}
