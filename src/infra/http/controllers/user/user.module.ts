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

import { UpdateUserUseCase } from "@/domain/portal/application/use-cases/user/user-update-use-case"

import { CreateStoreContactsUseCase } from "@/domain/portal/application/use-cases/profile/store/contacts/create-store-contacts"
import { CreateClientProfileUseCase } from "@/domain/portal/application/use-cases/profile/client/create-client-profile-use-case"
import { CreateStoreProfileUseCase } from "@/domain/portal/application/use-cases/profile/store/create-store-profile"
import { CreateGeolocationUseCase } from "@/domain/portal/application/use-cases/geolocation/create-geolocation-use-case"
import { GeolocationModule } from "../geolocation/geolocation.module"
import { StoreProfileModule } from "../profile/store/store-profile.module"
import { ClientProfileModule } from "../profile/client/client-profile.module"
import { FetchStoreProfileUseCase } from "@/domain/portal/application/use-cases/profile/store/fetch-store-profile"
import { FetchClientProfileUseCase } from "@/domain/portal/application/use-cases/profile/client/fetch-client-profile-use-case"
import { FetchStoreProfileByUserIdUseCase } from "@/domain/portal/application/use-cases/profile/store/fetch-store-profile-by-user-id"

@Module({
  imports: [
    CryptographyModule,
    UserMongoModule,
    AuthModule,
    GeolocationModule,
    StoreProfileModule,
    ClientProfileModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserAuthLoginUseCase,
      useFactory: (
        userRepository: IUserRepository,
        encrypterGateway: EncrypterGateway,
        fetchClientProfile: FetchClientProfileUseCase,
        fetchStoreProfile: FetchStoreProfileByUserIdUseCase,
      ) => {
        return new UserAuthLoginUseCase(
          userRepository,
          encrypterGateway,
          fetchClientProfile,
          fetchStoreProfile,
        )
      },
      inject: [
        InfraUserRepository,
        EncrypterGateway,
        FetchClientProfileUseCase,
        FetchStoreProfileByUserIdUseCase,
      ],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (
        userRepository: IUserRepository,
        encrypterGateway: EncrypterGateway,
        fetchClientProfile: FetchClientProfileUseCase,
      ) => {
        return new UpdateUserUseCase(
          userRepository,
          encrypterGateway,
          fetchClientProfile,
        )
      },
      inject: [
        InfraUserRepository,
        EncrypterGateway,
        FetchClientProfileUseCase,
      ],
    },
    {
      provide: UserAuthSignUpUseCase,
      useFactory: (
        userRepository: IUserRepository,
        encrypterGateway: EncrypterGateway,
        createStoreProfileContact: CreateStoreContactsUseCase,
        createClientProfile: CreateClientProfileUseCase,
        createStoreProfile: CreateStoreProfileUseCase,
        createGeolocation: CreateGeolocationUseCase,
      ) => {
        return new UserAuthSignUpUseCase(
          userRepository,
          encrypterGateway,
          createStoreProfileContact,
          createClientProfile,
          createStoreProfile,
          createGeolocation,
        )
      },
      inject: [
        InfraUserRepository,
        EncrypterGateway,
        CreateStoreContactsUseCase,
        CreateClientProfileUseCase,
        CreateStoreProfileUseCase,
        CreateGeolocationUseCase,
      ],
    },
  ],
})
export class UserModule {}
