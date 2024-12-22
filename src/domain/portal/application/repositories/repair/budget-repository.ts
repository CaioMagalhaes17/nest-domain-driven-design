import { BaseDomainRepository } from "@/core/domain/base.repository.interface"
import { Budget } from "@/domain/portal/enterprise/repair/budget"

export interface IBudgetRepository extends BaseDomainRepository<Budget> {}
