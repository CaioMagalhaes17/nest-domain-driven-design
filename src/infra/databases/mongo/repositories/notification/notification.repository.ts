import { BaseInfraRepository } from "@/core/infra/base.repository"
import { Model } from "mongoose"
import { Notification } from "../../schemas/notification/notification.schema"
import { NotificationBody } from "@/domain/portal/enterprise/notification/notification.entity"
import { NotificationMapper } from "../../mappers/notification/notification.mapper"

export class InfraNotificationRepository extends BaseInfraRepository<
  Notification,
  NotificationBody
> {
  constructor(
    protected readonly model: Model<Notification>,
    protected readonly mapper: NotificationMapper,
  ) {
    super(model, mapper)
  }
}
