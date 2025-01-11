import { Solicitation as MongoSolicitation } from "../../../schemas/repair/solicitation.schema"
import { Model } from "mongoose"
import { BaseInfraRepository } from "@/core/infra/base.repository"
import { Solicitation } from "@/domain/portal/enterprise/repair/solicitation"
import { SolicitationMapper } from "../../../mappers/repair/solicitation.mapper"
import { ISolicitationRepository } from "@/domain/portal/application/repositories/repair/solicitation-repository.interface"

export class InfraSolicitationRepository
  extends BaseInfraRepository<MongoSolicitation, Solicitation>
  implements ISolicitationRepository {
  constructor(
    protected readonly model: Model<MongoSolicitation>,
    protected readonly mapper: SolicitationMapper,
  ) {
    super(model, mapper)
  }

  async findByParam<ParamType>(param: ParamType) {
    return this.mapper.toDomainArray(
      await this.model
        .find(param)
        .populate(["solicitationFormId", "clientProfileId"])
        .exec(),
    )
  }

  async findById(id: string): Promise<any> {
    try {
      return this.mapper.toDomain(
        await this.model
          .findById(id)
          .populate(["solicitationFormId", "clientProfileId"])
          .exec(),
      )
    } catch (error) {
      return
    }
  }

  async create(data: Partial<Solicitation>): Promise<{ id: string }> {
    const datatoinsert = {
      solicitationFormId: data.solicitationFormId,
      clientProfileId: data.clientProfileId,
      ...data,
    }

    return { id: (await this.model.create(datatoinsert)).id }
  }
}
