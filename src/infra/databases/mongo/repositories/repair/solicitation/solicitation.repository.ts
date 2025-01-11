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
        .populate(["solicitationForm", "clientProfile"])
        .exec(),
    )
  }

  async findById(id: string): Promise<any> {
    try {
      return this.mapper.toDomainWithSolicitationForm(
        await this.model
          .findById(id)
          .populate(["solicitationForm", "clientProfile"])
          .exec(),
      )
    } catch (error) {
      return
    }
  }

  async create(data: Partial<Solicitation>): Promise<{ id: string }> {
    const datatoinsert = {
      solicitationForm: data.solicitationForm,
      clientProfile: data.clientProfile,
      ...data,
    }

    return { id: (await this.model.create(datatoinsert)).id }
  }
}
