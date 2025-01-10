import { BaseMapper } from "@/core/infra/base.mapper"
import { StoreProfile } from "@/domain/portal/enterprise/profile/store/store-profile"
import { StoreProfile as MongoStoreProfile } from "../../schemas/profiles/store.schema"

export class StoreProfileMapper
  implements BaseMapper<MongoStoreProfile, StoreProfile> {
  toDomain(row: MongoStoreProfile): StoreProfile {
    if (!row) return
    const { _id, ...rest } = row.toObject()
    return StoreProfile.create(
      {
        ...rest,
      },
      _id,
    )
  }

  toDomainArray(rows: MongoStoreProfile[]): StoreProfile[] {
    if (!rows || rows.length === 0) return []
    return rows.map((row) => this.toDomain(row)).filter((item) => item !== null)
  }
}
