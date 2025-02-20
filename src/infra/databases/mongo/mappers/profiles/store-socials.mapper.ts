import { BaseMapper } from "@/core/infra/base.mapper"
import { StoreSocials as MongoStoreSocials } from "../../schemas/profiles/store-socials.schema"
import { StoreSocials } from "@/domain/portal/enterprise/profile/store/store-socials"

export class StoreSocialsMapper
  implements BaseMapper<MongoStoreSocials, StoreSocials> {
  toDomain(row: MongoStoreSocials): StoreSocials {
    if (!row) return
    const { _id, ...rest } = row.toObject()
    return StoreSocials.create(
      {
        ...rest,
      },
      _id,
    )
  }

  toDomainArray(rows: MongoStoreSocials[]): StoreSocials[] {
    if (!rows || rows.length === 0) return []
    return rows.map((row) => this.toDomain(row)).filter((item) => item !== null)
  }
}
