import { Module } from "@nestjs/common"
import { UserRepository } from "src/domain/portal/application/repositories/user/user-repository"
import { User } from "./sequelize/model/user/user.model"
import { SequelizeUserRepository } from "./sequelize/repositories/user/user-repository"
import { Sequelize } from "sequelize-typescript"

@Module({
  providers: [
    {
      provide: UserRepository,
      useFactory: (user: User) => {
        return new SequelizeUserRepository(user)
      },
      inject: [Sequelize],
    },
  ],
  exports: [UserRepository],
})
export class UserDatabaseModule {}
