import { UserRepository } from "src/domain/portal/application/repositories/user/user-repository"
import { User as SequelizeUser } from "../../model/user/user.model"
import { UserMapper } from "../../mappers/user/user-mapper"
import { User } from "src/domain/portal/enterprise/user/user"

export class SequelizeUserRepository implements UserRepository {
  constructor(private user: SequelizeUser) {}

  async fetchUserByLogin(login: string): Promise<undefined | User> {
    const result = await SequelizeUser.findAll({
      where: { login },
    })
    if (result.length > 0) {
      return UserMapper.toDomain(result[0])
    }
  }

  async createNewUser(
    name: string,
    login: string,
    passwordHash: string,
  ): Promise<undefined | User> {
    const result = await SequelizeUser.create({
      name,
      login,
      password: passwordHash,
    })
    if (result) {
      return UserMapper.toDomain(result)
    }
  }
}
