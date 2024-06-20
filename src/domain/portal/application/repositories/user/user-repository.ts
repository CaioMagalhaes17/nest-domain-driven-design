import { User } from "src/domain/portal/enterprise/user/user";

export abstract class UserRepository {
  abstract fetchUserByLogin(login: string): Promise<undefined | User>
}