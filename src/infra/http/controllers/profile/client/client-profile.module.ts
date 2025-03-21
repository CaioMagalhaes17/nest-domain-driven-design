import { Module } from "@nestjs/common"
import { FetchClientProfileUseCaseController } from "./fetch-client-profile-use-case.controller"
import { FetchClientProfileUseCase } from "src/domain/portal/application/use-cases/profile/client/fetch-client-profile-use-case"
import { IClientProfileRepository } from "src/domain/portal/application/repositories/profile/client/client-profile.repository"
import { CreateClientProfileUseCaseController } from "./create-client-profile-use-case.controller"
import { CreateClientProfileUseCase } from "src/domain/portal/application/use-cases/profile/client/create-client-profile-use-case"
import { EditClientProfileUseCase } from "src/domain/portal/application/use-cases/profile/client/edit-client-profile-use-case"
import { EditClientProfileUseCaseController } from "./edit-client-profile-use-case.controller"
import { DeleteClientProfileUseCase } from "src/domain/portal/application/use-cases/profile/client/delete-client-profile-use-case"
import { DeleteClientProfileUseCaseController } from "./delete-client-profile-use-case.controller"
import { InfraClientProfileRepository } from "@/infra/databases/mongo/repositories/profiles/client.repository"
import { ProfilesMongoModule } from "@/infra/databases/mongo/profiles.module"
import { FetchGeolocationUseCase } from "@/domain/portal/application/use-cases/geolocation/fetch-geolocation-use-case"
import { GeolocationModule } from "../../geolocation/geolocation.module"

@Module({
  imports: [ProfilesMongoModule, GeolocationModule],
  exports: [CreateClientProfileUseCase, FetchClientProfileUseCase],
  controllers: [
    FetchClientProfileUseCaseController,
    CreateClientProfileUseCaseController,
    EditClientProfileUseCaseController,
    DeleteClientProfileUseCaseController,
  ],
  providers: [
    {
      provide: FetchClientProfileUseCase,
      useFactory: (
        clientProfileRepository: IClientProfileRepository,
        fetchGeoLocationUseCase: FetchGeolocationUseCase,
      ) => {
        return new FetchClientProfileUseCase(
          clientProfileRepository,
          fetchGeoLocationUseCase,
        )
      },
      inject: [InfraClientProfileRepository, FetchGeolocationUseCase],
    },
    {
      provide: CreateClientProfileUseCase,
      useFactory: (clientProfileRepository: IClientProfileRepository) => {
        return new CreateClientProfileUseCase(clientProfileRepository)
      },
      inject: [InfraClientProfileRepository],
    },
    {
      provide: EditClientProfileUseCase,
      useFactory: (clientProfileRepository: IClientProfileRepository) => {
        return new EditClientProfileUseCase(clientProfileRepository)
      },
      inject: [InfraClientProfileRepository],
    },
    {
      provide: DeleteClientProfileUseCase,
      useFactory: (clientProfileRepository: IClientProfileRepository) => {
        return new DeleteClientProfileUseCase(clientProfileRepository)
      },
      inject: [InfraClientProfileRepository],
    },
  ],
})
export class ClientProfileModule {}
