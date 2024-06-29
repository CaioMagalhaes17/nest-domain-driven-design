import { User } from "src/domain/portal/enterprise/user/user"

export abstract class UserRepository {
  abstract fetchUserByLogin(login: string): Promise<undefined | User>
  abstract createNewUser(
    name: string,
    login: string,
    passwordHash: string,
  ): Promise<undefined | User>
}
