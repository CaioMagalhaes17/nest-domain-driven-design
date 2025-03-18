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

  async findByParam<ParamType>(param: ParamType) {
    return this.mapper.toDomainArray(
      await this.model.find(param).sort({ createdAt: -1 }).exec(),
    )
  }
}
