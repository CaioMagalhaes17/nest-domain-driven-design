import { BaseInfraRepository } from "@/core/infra/base.repository"
import { StoreProfile } from "@/domain/portal/enterprise/profile/store/store-profile"
import { Model } from "mongoose"
import { StoreProfile as MongoStoreProfile } from "../../schemas/profiles/store.schema"
import { StoreProfileMapper } from "../../mappers/profiles/stores.mapper"

export class InfraStoreProfileRepository extends BaseInfraRepository<
  MongoStoreProfile,
  StoreProfile
> {
  constructor(
    protected readonly model: Model<MongoStoreProfile>,
    protected readonly mapper: StoreProfileMapper,
  ) {
    super(model, mapper)
  }
}
