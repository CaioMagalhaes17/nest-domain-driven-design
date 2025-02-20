import { BaseInfraRepository } from "@/core/infra/base.repository"
import { Model } from "mongoose"
import { StoreContacts as MongoStoreContacts } from "../../schemas/profiles/store-contacts.schema"
import { StoreContacts } from "@/domain/portal/enterprise/profile/store/store-contacts"
import { StoreContactsMapper } from "../../mappers/profiles/store-contacts"

export class InfraStoreContactsRepository extends BaseInfraRepository<
  MongoStoreContacts,
  StoreContacts
> {
  constructor(
    protected readonly model: Model<MongoStoreContacts>,
    protected readonly mapper: StoreContactsMapper,
  ) {
    super(model, mapper)
  }
}
