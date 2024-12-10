import { BaseMapper } from "@/core/infra/base.mapper"
import { User as MongoUser } from "../../schemas/user/user.schema"
import { User } from "@/domain/portal/enterprise/user/user"

export class UserMapper implements BaseMapper<MongoUser, User> {
  toDomain(row: MongoUser): User {
    if (!row) return
    const { _id, ...rest } = row.toObject()
    return User.create(
      {
        ...rest,
      },
      _id,
    )
  }

  toDomainArray(rows: MongoUser[]): User[] {
    if (!rows || rows.length === 0) return []
    return rows.map((row) => this.toDomain(row)).filter((item) => item !== null)
  }
}
