import { Module } from "@nestjs/common"
import { CreateStoreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/create-store-profile"
import { CreateStoreProfileUseCaseController } from "./create-store-profile-use-case.controller"
import { StorerProfileDatabaseModule } from "src/infra/databases/store-profile-database.module"
import { StoreProfileRepository } from "src/domain/portal/application/repositories/profile/store/store-profile.repository"

@Module({
  imports: [StorerProfileDatabaseModule],
  controllers: [CreateStoreProfileUseCaseController],
  providers: [
    {
      provide: CreateStoreProfileUseCase,
      useFactory: (storeProfileRepository: StoreProfileRepository) => {
        return new CreateStoreProfileUseCase(storeProfileRepository)
      },
      inject: [StoreProfileRepository],
    },
  ],
})
export class StoreProfileModule {}
