import { BaseInfraRepository } from "@/core/infra/base.repository"
import { Budget } from "@/domain/portal/enterprise/repair/budget"
import { Budget as MongoBudget } from "../../../schemas/repair/budget.schema"
import { Model } from "mongoose"
import { BudgetMapper } from "../../../mappers/repair/budget.mapper"

export class InfraBudgetRepository extends BaseInfraRepository<
  MongoBudget,
  Budget
> {
  constructor(
    protected readonly model: Model<MongoBudget>,
    protected readonly mapper: BudgetMapper,
  ) {
    super(model, mapper)
  }

  async findByParam<ParamType>(param: ParamType) {
    return this.mapper.toDomainArray(
      await this.model.find(param).populate("solicitation").exec(),
    )
  }

  async findById(id: string): Promise<any> {
    try {
      return this.mapper.toDomainWithSolicitation(
        await this.model.findById(id).populate("solicitation").exec(),
      )
    } catch (error) {
      return
    }
  }

  async create(data: Partial<Budget>): Promise<{ id: string }> {
    const datatoinsert = {
      solicitation: data.solicitationId,
      ...data,
    }

    return { id: (await this.model.create(datatoinsert)).id }
  }
}
