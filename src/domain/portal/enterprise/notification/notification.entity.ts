import { BaseEntity } from "src/core/entities/base-entity"
import { NotificationsType } from "../../application/types/notifications"

type NotificationBodyProps = {
  type: NotificationsType
  message: string
  senderName: string
  sendedDate: string
}

export class NotificationBody extends BaseEntity<NotificationBodyProps> {
  static create(props: NotificationBodyProps, id: string) {
    return new NotificationBody(props, id)
  }

  get type(): NotificationsType {
    return this.props.type
  }

  get message(): string {
    return this.props.message
  }

  get senderName(): string {
    return this.props.senderName
  }

  get sendedDate(): string {
    return this.props.sendedDate
  }
}
