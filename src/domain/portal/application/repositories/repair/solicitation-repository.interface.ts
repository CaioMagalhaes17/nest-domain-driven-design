import { BaseDomainRepository } from "@/core/domain/base.repository.interface"
import { Solicitation } from "@/domain/portal/enterprise/repair/solicitation"

export interface ISolicitationRepository
  extends BaseDomainRepository<Solicitation> {}
