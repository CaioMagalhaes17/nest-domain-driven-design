import { BaseInfraRepository } from "@/core/infra/base.repository"
import { ClientProfile } from "@/domain/portal/enterprise/profile/client/client-profile"
import { Model } from "mongoose"
import { ClientProfile as MongoClientProfile } from "../../schemas/profiles/client.schema"
import { ClientProfileMapper } from "../../mappers/profiles/client.mapper"

export class InfraClientProfileRepository extends BaseInfraRepository<
  MongoClientProfile,
  ClientProfile
> {
  constructor(
    protected readonly model: Model<MongoClientProfile>,
    protected readonly mapper: ClientProfileMapper,
  ) {
    super(model, mapper)
  }
}
