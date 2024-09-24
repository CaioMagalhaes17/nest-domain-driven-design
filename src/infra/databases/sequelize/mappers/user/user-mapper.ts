import { User } from "src/domain/portal/enterprise/user/user"
import { User as SequelizeUserModel } from "../../model/user/user.model"

export class UserMapper {
  static toDomain(row: SequelizeUserModel): User {
    return User.create(
      {
        name: row.name,
        login: row.login,
        password: row.password,
        isStore: row.isStore == "false" ? false : true,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      },
      row.id,
    )
  }
}
