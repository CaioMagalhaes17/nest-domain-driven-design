import { SolicitationForm as MongoSolicitation } from "../../schemas/repair/solicitation-form.schema"
import { BaseMapper } from "@/core/infra/base.mapper"
import { SolicitationForm } from "@/domain/portal/enterprise/repair/solicitation.form"

export class SolicitationFormMapper
  implements BaseMapper<MongoSolicitation, SolicitationForm> {
  toDomain(row: MongoSolicitation): SolicitationForm {
    if (!row) return
    const { _id, ...rest } = row.toObject()
    return SolicitationForm.create(
      {
        ...rest,
      },
      _id,
    )
  }

  toDomainArray(rows: MongoSolicitation[]): SolicitationForm[] {
    if (!rows || rows.length === 0) return []
    return rows.map((row) => this.toDomain(row)).filter((item) => item !== null)
  }
}
