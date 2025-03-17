import { BaseDomainRepository } from "@/core/domain/base.repository.interface"
import { NotificationBody } from "@/domain/portal/enterprise/notification/notification.entity"

export interface INotificationRepository
  extends BaseDomainRepository<NotificationBody> {}
