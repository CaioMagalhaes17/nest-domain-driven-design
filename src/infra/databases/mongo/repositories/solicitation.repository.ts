import { Solicitation } from "../schemas/repair/solicitation.schema"
import { Model } from "mongoose"
import { BaseRepository } from "@/core/infra/base.repository"

export class InfraSolicitationRepository extends BaseRepository<Solicitation> {
  constructor(readonly solicitationModel: Model<Solicitation>) {
    super(solicitationModel)
  }

  getevery() {
    return this.solicitationModel.find().exec()
  }
}
