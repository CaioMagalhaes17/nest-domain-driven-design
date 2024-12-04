import { Solicitation } from "@/domain/portal/enterprise/repair/solicitation"
import { Solicitation as MongoSolicitation } from "../../schemas/repair/solicitation.schema"

export class SolicitationMapper {
  static toDomain(row: MongoSolicitation): Solicitation {
    if (!row) return
    const { _id, ...rest } = row.toObject()
    return Solicitation.create(
      {
        ...rest,
      },
      _id,
    )
  }
}
