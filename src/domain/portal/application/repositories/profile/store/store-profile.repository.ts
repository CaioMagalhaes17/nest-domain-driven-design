import { BaseDomainRepository } from "@/core/domain/base.repository.interface"
import { StoreProfile } from "@/domain/portal/enterprise/profile/store/store-profile"

export interface IStoreProfileRepository
  extends BaseDomainRepository<StoreProfile> {}
