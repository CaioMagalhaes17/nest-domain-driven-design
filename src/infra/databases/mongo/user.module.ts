import { Module } from "@nestjs/common"
import { getModelToken, MongooseModule } from "@nestjs/mongoose"
import { User, UserSchema } from "./schemas/user/user.schema"
import { UserMapper } from "./mappers/user/user.mapper"
import { InfraUserRepository } from "./repositories/user/user.repository"
import { Model } from "mongoose"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UserMapper,
    {
      provide: InfraUserRepository,
      useFactory: (model: Model<User>, mapper: UserMapper) => {
        return new InfraUserRepository(model, mapper)
      },
      inject: [getModelToken(User.name), UserMapper],
    },
  ],
  exports: [InfraUserRepository],
})
export class UserMongoModule {}
