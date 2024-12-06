import { BaseDomainRepository } from "@/core/domain/base.repository.interface"
import { SolicitationForm } from "@/domain/portal/enterprise/repair/solicitation.form"

export interface ISolicitationFormRepository
  extends BaseDomainRepository<SolicitationForm> {
  deleteBySolicitationId(id: string): Promise<void>
}
