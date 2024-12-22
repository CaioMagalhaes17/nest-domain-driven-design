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
}
