import { BaseDomainRepository } from "@/core/domain/base.repository.interface"
import { ClientProfile } from "@/domain/portal/enterprise/profile/client/client-profile"

export interface IClientProfileRepository
  extends BaseDomainRepository<ClientProfile> {}
