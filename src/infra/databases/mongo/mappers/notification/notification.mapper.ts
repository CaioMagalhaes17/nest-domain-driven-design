import { BaseMapper } from "@/core/infra/base.mapper"
import { NotificationBody } from "@/domain/portal/enterprise/notification/notification.entity"
import { Notification } from "../../schemas/notification/notification.schema"

export class NotificationMapper
  implements BaseMapper<Notification, NotificationBody> {
  toDomain(row: Notification): NotificationBody {
    if (!row) return
    const { _id, ...rest } = row.toObject()
    return NotificationBody.create(
      {
        ...rest,
      },
      _id,
    )
  }

  toDomainArray(rows: Notification[]): NotificationBody[] {
    if (!rows || rows.length === 0) return []
    return rows.map((row) => this.toDomain(row)).filter((item) => item !== null)
  }
}
