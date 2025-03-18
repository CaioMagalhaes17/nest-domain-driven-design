import { BaseEntity } from "src/core/entities/base-entity"
import { NotificationsType } from "../../application/types/notifications"

type NotificationBodyProps = {
  type: NotificationsType
  message: string
  senderName: string
  profileId: string
  createdAt: Date
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

  get profileId(): string {
    return this.props.profileId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }
}
