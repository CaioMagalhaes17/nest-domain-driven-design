import { BaseMapper } from "@/core/infra/base.mapper"
import { ClientProfile } from "@/domain/portal/enterprise/profile/client/client-profile"
import { ClientProfile as MongoClientProfile } from "../../schemas/profiles/client.schema"

export class ClientProfileMapper
  implements BaseMapper<MongoClientProfile, ClientProfile> {
  toDomain(row: MongoClientProfile): ClientProfile {
    if (!row) return
    const { _id, ...rest } = row.toObject()
    return ClientProfile.create(
      {
        ...rest,
      },
      _id,
    )
  }

  toDomainArray(rows: MongoClientProfile[]): ClientProfile[] {
    if (!rows || rows.length === 0) return []
    return rows.map((row) => this.toDomain(row)).filter((item) => item !== null)
  }
}
