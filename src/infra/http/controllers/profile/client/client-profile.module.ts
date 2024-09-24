import { Module } from "@nestjs/common"
import { ClientProfileDatabaseModule } from "src/infra/databases/client-profile-database.module"
import { FetchClientProfileUseCaseController } from "./fetch-client-profile-use-case.controller"
import { FetchClientProfileUseCase } from "src/domain/portal/application/use-cases/profile/client/fetch-client-profile-use-case"
import { ClientProfileRepository } from "src/domain/portal/application/repositories/profile/client/client-profile.repository"
import { CreateClientProfileUseCaseController } from "./create-client-profile-use-case.controller"
import { CreateClientProfileUseCase } from "src/domain/portal/application/use-cases/profile/client/create-client-profile-use-case"
import { EditClientProfileUseCase } from "src/domain/portal/application/use-cases/profile/client/edit-client-profile-use-case"
import { EditClientProfileUseCaseController } from "./edit-client-profile-use-case.controller"
import { DeleteClientProfileUseCase } from "src/domain/portal/application/use-cases/profile/client/delete-client-profile-use-case"
import { DeleteClientProfileUseCaseController } from "./delete-client-profile-use-case.controller"

@Module({
  imports: [ClientProfileDatabaseModule],
  controllers: [
    FetchClientProfileUseCaseController,
    CreateClientProfileUseCaseController,
    EditClientProfileUseCaseController,
    DeleteClientProfileUseCaseController,
  ],
  providers: [
    {
      provide: FetchClientProfileUseCase,
      useFactory: (clientProfileRepository: ClientProfileRepository) => {
        return new FetchClientProfileUseCase(clientProfileRepository)
      },
      inject: [ClientProfileRepository],
    },
    {
      provide: CreateClientProfileUseCase,
      useFactory: (clientProfileRepository: ClientProfileRepository) => {
        return new CreateClientProfileUseCase(clientProfileRepository)
      },
      inject: [ClientProfileRepository],
    },
    {
      provide: EditClientProfileUseCase,
      useFactory: (clientProfileRepository: ClientProfileRepository) => {
        return new EditClientProfileUseCase(clientProfileRepository)
      },
      inject: [ClientProfileRepository],
    },
    {
      provide: DeleteClientProfileUseCase,
      useFactory: (clientProfileRepository: ClientProfileRepository) => {
        return new DeleteClientProfileUseCase(clientProfileRepository)
      },
      inject: [ClientProfileRepository],
    },
  ],
})
export class ClientProfileModule {}
