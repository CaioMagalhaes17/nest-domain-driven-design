import { BaseDomainRepository } from "@/core/domain/base.repository.interface"
import { StoreSocials } from "@/domain/portal/enterprise/profile/store/store-socials"

export interface IStoreSocialsRepository
  extends BaseDomainRepository<StoreSocials> {}
