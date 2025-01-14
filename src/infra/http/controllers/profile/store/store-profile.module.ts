import { Module } from "@nestjs/common"
import { CreateStoreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/create-store-profile"
import { CreateStoreProfileUseCaseController } from "./create-store-profile-use-case.controller"
import { IStoreProfileRepository } from "src/domain/portal/application/repositories/profile/store/store-profile.repository"
import { EditStoreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/edit-store-profile"
import { DeleteStorreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/delete-store-profile"
import { EditStoreProfileUseCaseController } from "./edit-store-profile-use-case.controller"
import { DeleteStoreProfileUseCaseController } from "./delete-store-prrofile-use-case.controller"
import { FetchStoreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/fetch-store-profile"
import { FetchStoreProfileUseCaseController } from "./fetch-store-profile-use-case.controller"
import { InfraStoreProfileRepository } from "@/infra/databases/mongo/repositories/profiles/store.repository"
import { ProfilesMongoModule } from "@/infra/databases/mongo/profiles.module"
import { SelectProfileUseCase } from "@/domain/portal/application/use-cases/profile/store/select-profile-use-case"
import { SelectProfileUseCaseController } from "./select-profile-use-case.controller"
import { IUserRepository } from "@/domain/portal/application/repositories/user/user-repository.interface"
import { EncrypterGateway } from "@/domain/portal/application/gateway/user/encrypter.gateway"
import { InfraUserRepository } from "@/infra/databases/mongo/repositories/user/user.repository"
import { CryptographyModule } from "@/infra/auth/cryptography/cryptography.module"
import { UserMongoModule } from "@/infra/databases/mongo/user.module"

@Module({
  imports: [ProfilesMongoModule, CryptographyModule, UserMongoModule],
  controllers: [
    CreateStoreProfileUseCaseController,
    EditStoreProfileUseCaseController,
    DeleteStoreProfileUseCaseController,
    FetchStoreProfileUseCaseController,
    SelectProfileUseCaseController,
  ],
  exports: [FetchStoreProfileUseCase],
  providers: [
    {
      provide: CreateStoreProfileUseCase,
      useFactory: (storeProfileRepository: IStoreProfileRepository) => {
        return new CreateStoreProfileUseCase(storeProfileRepository)
      },
      inject: [InfraStoreProfileRepository],
    },
    {
      provide: SelectProfileUseCase,
      useFactory: (
        userRepository: IUserRepository,
        encrypterGateway: EncrypterGateway,
      ) => {
        return new SelectProfileUseCase(userRepository, encrypterGateway)
      },
      inject: [InfraUserRepository, EncrypterGateway],
    },
    {
      provide: EditStoreProfileUseCase,
      useFactory: (storeProfileRepository: IStoreProfileRepository) => {
        return new EditStoreProfileUseCase(storeProfileRepository)
      },
      inject: [InfraStoreProfileRepository],
    },
    {
      provide: DeleteStorreProfileUseCase,
      useFactory: (storeProfileRepository: IStoreProfileRepository) => {
        return new DeleteStorreProfileUseCase(storeProfileRepository)
      },
      inject: [InfraStoreProfileRepository],
    },
    {
      provide: FetchStoreProfileUseCase,
      useFactory: (storeProfileRepository: IStoreProfileRepository) => {
        return new FetchStoreProfileUseCase(storeProfileRepository)
      },
      inject: [InfraStoreProfileRepository],
    },
  ],
})
export class StoreProfileModule {}
