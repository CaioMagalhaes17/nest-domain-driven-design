import { BaseInfraRepository } from "@/core/infra/base.repository"
import { Model } from "mongoose"
import { StoreSocials as MongoStoreSocials } from "../../schemas/profiles/store-socials.schema"
import { StoreSocials } from "@/domain/portal/enterprise/profile/store/store-socials"
import { StoreSocialsMapper } from "../../mappers/profiles/store-socials.mapper"

export class InfraStoreSocialsRepository extends BaseInfraRepository<
  MongoStoreSocials,
  StoreSocials
> {
  constructor(
    protected readonly model: Model<MongoStoreSocials>,
    protected readonly mapper: StoreSocialsMapper,
  ) {
    super(model, mapper)
  }
}
