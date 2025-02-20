import { BaseDomainRepository } from "@/core/domain/base.repository.interface"
import { StoreContacts } from "@/domain/portal/enterprise/profile/store/store-contacts"

export interface IStoreContactsRepository
  extends BaseDomainRepository<StoreContacts> {}
