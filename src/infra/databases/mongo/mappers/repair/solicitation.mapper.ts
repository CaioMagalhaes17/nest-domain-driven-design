import { Solicitation } from "@/domain/portal/enterprise/repair/solicitation"
import { Solicitation as MongoSolicitation } from "../../schemas/repair/solicitation.schema"
import { BaseMapper } from "@/core/infra/base.mapper"
import { SolicitationForm } from "@/domain/portal/enterprise/repair/solicitation.form"

export class SolicitationMapper
  implements BaseMapper<MongoSolicitation, Solicitation> {
  toDomain(row: MongoSolicitation): Solicitation {
    if (!row) return
    const { _id, ...rest } = row.toObject()
    return Solicitation.create(
      {
        ...rest,
      },
      _id,
    )
  }

  toDomainArray(rows: MongoSolicitation[]): Solicitation[] {
    if (!rows || rows.length === 0) return []
    return rows.map((row) => this.toDomain(row)).filter((item) => item !== null)
  }

  toDomainWithSolicitationForm(row: MongoSolicitation): Solicitation {
    const { _id, solicitationForm, ...rest } = row.toObject()
    const tentativa = Solicitation.create(
      {
        form: SolicitationForm.create(solicitationForm, solicitationForm._id),
        ...rest,
      },
      _id,
    )
    return tentativa
  }
}
