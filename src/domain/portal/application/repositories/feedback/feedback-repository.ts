import { BaseDomainRepository } from "@/core/domain/base.repository.interface"
import { Feedback } from "@/domain/portal/enterprise/feedback/feedback"

export interface IFeedbackRepository extends BaseDomainRepository<Feedback> {}
