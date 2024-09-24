import { Module } from "@nestjs/common"
import { CreateStoreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/create-store-profile"
import { CreateStoreProfileUseCaseController } from "./create-store-profile-use-case.controller"
import { StorerProfileDatabaseModule } from "src/infra/databases/store-profile-database.module"
import { StoreProfileRepository } from "src/domain/portal/application/repositories/profile/store/store-profile.repository"
import { EditStoreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/edit-store-profile"
import { DeleteStorreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/delete-store-profile"
import { EditStoreProfileUseCaseController } from "./edit-store-profile-use-case.controller"
import { DeleteStoreProfileUseCaseController } from "./delete-store-prrofile-use-case.controller"
import { FetchStoreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/fetch-store-profile"
import { FetchStoreProfileUseCaseController } from "./fetch-store-profile-use-case.controller"

@Module({
  imports: [StorerProfileDatabaseModule],
  controllers: [
    CreateStoreProfileUseCaseController,
    EditStoreProfileUseCaseController,
    DeleteStoreProfileUseCaseController,
    FetchStoreProfileUseCaseController,
  ],
  providers: [
    {
      provide: CreateStoreProfileUseCase,
      useFactory: (storeProfileRepository: StoreProfileRepository) => {
        return new CreateStoreProfileUseCase(storeProfileRepository)
      },
      inject: [StoreProfileRepository],
    },
    {
      provide: EditStoreProfileUseCase,
      useFactory: (storeProfileRepository: StoreProfileRepository) => {
        return new EditStoreProfileUseCase(storeProfileRepository)
      },
      inject: [StoreProfileRepository],
    },
    {
      provide: DeleteStorreProfileUseCase,
      useFactory: (storeProfileRepository: StoreProfileRepository) => {
        return new DeleteStorreProfileUseCase(storeProfileRepository)
      },
      inject: [StoreProfileRepository],
    },
    {
      provide: FetchStoreProfileUseCase,
      useFactory: (storeProfileRepository: StoreProfileRepository) => {
        return new FetchStoreProfileUseCase(storeProfileRepository)
      },
      inject: [StoreProfileRepository],
    },
  ],
})
export class StoreProfileModule {}
