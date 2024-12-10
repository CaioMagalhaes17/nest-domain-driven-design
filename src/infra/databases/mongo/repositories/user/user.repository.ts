import { BaseInfraRepository } from "@/core/infra/base.repository"
import { IUserRepository } from "@/domain/portal/application/repositories/user/user-repository.interface"
import { User as MongoUser } from "../../schemas/user/user.schema"
import { User } from "@/domain/portal/enterprise/user/user"
import { Model } from "mongoose"
import { UserMapper } from "../../mappers/user/user.mapper"

export class InfraUserRepository
  extends BaseInfraRepository<MongoUser, User>
  implements IUserRepository {
  constructor(
    protected readonly model: Model<MongoUser>,
    protected readonly mapper: UserMapper,
  ) {
    super(model, mapper)
  }

  async fetchUserByLogin(login: string): Promise<User> {
    return this.mapper.toDomain(await this.model.findOne({ login }).exec())
  }
}
