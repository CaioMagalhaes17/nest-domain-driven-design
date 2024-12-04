import { BaseRepository } from "@/core/infra/base.repository"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { SolicitationForm } from "../schemas/repair/solicitation-form.schema"

export class SolicitationFormRepository extends BaseRepository<SolicitationForm> {
  constructor(
    @InjectModel(SolicitationForm.name)
    private solicitationsFormModel: Model<SolicitationForm>,
  ) {
    super(solicitationsFormModel)
  }
}
