import { Module } from "@nestjs/common"
import { ClientProfileDatabaseModule } from "src/infra/databases/client-profile-database.module"
import { FetchClientProfileUseCaseController } from "./fetch-client-profile-use-case.controller"
import { FetchClientProfileUseCase } from "src/domain/portal/application/use-cases/profile/client/fetch-client-profile-use-case"
import { ClientProfileRepository } from "src/domain/portal/application/repositories/profile/client/client-profile.repository"

@Module({
  imports: [ClientProfileDatabaseModule],
  controllers: [FetchClientProfileUseCaseController],
  providers: [
    {
      provide: FetchClientProfileUseCase,
      useFactory: (clientProfileRepository: ClientProfileRepository) => {
        return new FetchClientProfileUseCase(clientProfileRepository)
      },
      inject: [ClientProfileRepository],
    },
  ],
})
export class ClientProfileModule {}
