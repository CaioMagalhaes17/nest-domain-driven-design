import { SolicitationForm as MongoSolicitation } from "../schemas/repair/solicitation-form.schema"
import { Model } from "mongoose"
import { BaseInfraRepository } from "@/core/infra/base.repository"
import { SolicitationForm } from "@/domain/portal/enterprise/repair/solicitation.form"
import { SolicitationFormMapper } from "../mappers/repair/solicitation-form.mapper"

export class InfraSolicitationFormRepository extends BaseInfraRepository<
  MongoSolicitation,
  SolicitationForm
> {
  constructor(
    protected readonly model: Model<MongoSolicitation>,
    protected readonly mapper: SolicitationFormMapper,
  ) {
    super(model, mapper)
  }
}
