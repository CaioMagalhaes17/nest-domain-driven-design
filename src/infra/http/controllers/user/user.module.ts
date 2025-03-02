import { Module } from "@nestjs/common"
import { UserController } from "./user.controller"
import { AuthModule } from "src/infra/auth/auth.module"
import { UserAuthLoginUseCase } from "src/domain/portal/application/use-cases/user/user-auth-login-use-case"
import { EncrypterGateway } from "@/domain/portal/application/gateways/user/encrypter.gateway"
import { CryptographyModule } from "src/infra/auth/cryptography/cryptography.module"
import { UserAuthSignUpUseCase } from "src/domain/portal/application/use-cases/user/user-auth-signup-use-case"
import { UserMongoModule } from "@/infra/databases/mongo/user.module"
import { IUserRepository } from "@/domain/portal/application/repositories/user/user-repository.interface"
import { InfraUserRepository } from "@/infra/databases/mongo/repositories/user/user.repository"
import { IClientProfileRepository } from "@/domain/portal/application/repositories/profile/client/client-profile.repository"
import { InfraClientProfileRepository } from "@/infra/databases/mongo/repositories/profiles/client.repository"
import { ProfilesMongoModule } from "@/infra/databases/mongo/profiles.module"
import { InfraStoreProfileRepository } from "@/infra/databases/mongo/repositories/profiles/store.repository"
import { IStoreProfileRepository } from "@/domain/portal/application/repositories/profile/store/store-profile.repository"
import { UpdateUserUseCase } from "@/domain/portal/application/use-cases/user/user-update-use-case"

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
        storeProfileRepository: IStoreProfileRepository,
      ) => {
        return new UserAuthLoginUseCase(
          userRepository,
          encrypterGateway,
          clientProfile,
          storeProfileRepository,
        )
      },
      inject: [
        InfraUserRepository,
        EncrypterGateway,
        InfraClientProfileRepository,
        InfraStoreProfileRepository,
      ],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (
        userRepository: IUserRepository,
        encrypterGateway: EncrypterGateway,
        clientProfile: IClientProfileRepository,
        storeProfileRepository: IStoreProfileRepository,
      ) => {
        return new UpdateUserUseCase(
          userRepository,
          encrypterGateway,
          clientProfile,
          storeProfileRepository,
        )
      },
      inject: [
        InfraUserRepository,
        EncrypterGateway,
        InfraClientProfileRepository,
        InfraStoreProfileRepository,
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
