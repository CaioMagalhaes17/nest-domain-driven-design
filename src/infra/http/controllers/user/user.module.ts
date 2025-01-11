import { Module } from "@nestjs/common"
import { UserController } from "./user.controller"
import { AuthModule } from "src/infra/auth/auth.module"
import { UserAuthLoginUseCase } from "src/domain/portal/application/use-cases/user/user-auth-login-use-case"
import { EncrypterGateway } from "src/domain/portal/application/gateway/user/encrypter.gateway"
import { CryptographyModule } from "src/infra/auth/cryptography/cryptography.module"
import { UserAuthSignUpUseCase } from "src/domain/portal/application/use-cases/user/user-auth-signup-use-case"
import { UserMongoModule } from "@/infra/databases/mongo/user.module"
import { IUserRepository } from "@/domain/portal/application/repositories/user/user-repository.interface"
import { InfraUserRepository } from "@/infra/databases/mongo/repositories/user/user.repository"
import { IClientProfileRepository } from "@/domain/portal/application/repositories/profile/client/client-profile.repository"
import { InfraClientProfileRepository } from "@/infra/databases/mongo/repositories/profiles/client.repository"
import { ProfilesMongoModule } from "@/infra/databases/mongo/profiles.module"

@Module({
  imports: [
    CryptographyModule,
    UserMongoModule,
    AuthModule,
    ProfilesMongoModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserAuthLoginUseCase,
      useFactory: (
        userRepository: IUserRepository,
        encrypterGateway: EncrypterGateway,
        clientProfile: IClientProfileRepository,
      ) => {
        return new UserAuthLoginUseCase(
          userRepository,
          encrypterGateway,
          clientProfile,
        )
      },
      inject: [
        InfraUserRepository,
        EncrypterGateway,
        InfraClientProfileRepository,
      ],
    },
    {
      provide: UserAuthSignUpUseCase,
      useFactory: (
        userRepository: IUserRepository,
        encrypterGateway: EncrypterGateway,
      ) => {
        return new UserAuthSignUpUseCase(userRepository, encrypterGateway)
      },
      inject: [InfraUserRepository, EncrypterGateway],
    },
  ],
})
export class UserModule {}
