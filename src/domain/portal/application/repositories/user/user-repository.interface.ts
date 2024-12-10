import { BaseDomainRepository } from "@/core/domain/base.repository.interface"
import { User } from "@/domain/portal/enterprise/user/user"

export interface IUserRepository extends BaseDomainRepository<User> {
  fetchUserByLogin(login: string): Promise<undefined | User>
}
