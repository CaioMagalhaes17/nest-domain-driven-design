import { BaseMapper } from "@/core/infra/base.mapper"
import { StoreContacts as MongoStoreContacts } from "../../schemas/profiles/store-contacts.schema"
import { StoreContacts } from "@/domain/portal/enterprise/profile/store/store-contacts"

export class StoreContactsMapper
  implements BaseMapper<MongoStoreContacts, StoreContacts> {
  toDomain(row: MongoStoreContacts): StoreContacts {
    if (!row) return
    const { _id, ...rest } = row.toObject()
    return StoreContacts.create(
      {
        ...rest,
      },
      _id,
    )
  }

  toDomainArray(rows: MongoStoreContacts[]): StoreContacts[] {
    if (!rows || rows.length === 0) return []
    return rows.map((row) => this.toDomain(row)).filter((item) => item !== null)
  }
}
