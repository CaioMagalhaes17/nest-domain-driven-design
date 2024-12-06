import { Solicitation } from "@/domain/portal/enterprise/repair/solicitation"
import { Solicitation as MongoSolicitation } from "../../schemas/repair/solicitation.schema"
import { BaseMapper } from "@/core/infra/base.mapper"

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
}
