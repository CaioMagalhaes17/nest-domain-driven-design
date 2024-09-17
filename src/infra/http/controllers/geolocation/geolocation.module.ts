import { Module } from "@nestjs/common"
import { GeolocationDatabaseModule } from "src/infra/databases/geolocation-database.module"
import { CreateGeolocationUseCaseController } from "./create-geolocation-use-case.controller"
import { CreateGeolocationUseCase } from "src/domain/portal/application/use-cases/geolocation/create-geolocation-use-case"
import { GeolocationRepository } from "src/domain/portal/application/repositories/geolocation/geolocation-repository"
import { EditGeolocationUseCaseController } from "./edit-geolocation-use-case.controller"
import { EditGeolocationUseCase } from "src/domain/portal/application/use-cases/geolocation/edit-geolocation-use-case"
import { FetchGeolocationUseCase } from "src/domain/portal/application/use-cases/geolocation/fetch-geolocation-use-case"
import { FetchGeolocationUseCaseController } from "./fetch-geolocation-use-case.controller"
import { ClientProfileRepository } from "src/domain/portal/application/repositories/profile/client/client-profile.repository"
import { ClientProfileDatabaseModule } from "src/infra/databases/client-profile-database.module"

@Module({
  imports: [GeolocationDatabaseModule, ClientProfileDatabaseModule],
  controllers: [
    CreateGeolocationUseCaseController,
    EditGeolocationUseCaseController,
    FetchGeolocationUseCaseController,
  ],
  providers: [
    {
      provide: CreateGeolocationUseCase,
      useFactory: (
        geolocationRepository: GeolocationRepository,
        clientProfileRepository: ClientProfileRepository,
      ) => {
        return new CreateGeolocationUseCase(
          geolocationRepository,
          clientProfileRepository,
        )
      },
      inject: [GeolocationRepository, ClientProfileRepository],
    },
    {
      provide: EditGeolocationUseCase,
      useFactory: (geolocationRepository: GeolocationRepository) => {
        return new EditGeolocationUseCase(geolocationRepository)
      },
      inject: [GeolocationRepository],
    },
    {
      provide: FetchGeolocationUseCase,
      useFactory: (geolocationRepository: GeolocationRepository) => {
        return new FetchGeolocationUseCase(geolocationRepository)
      },
      inject: [GeolocationRepository],
    },
  ],
})
export class GeolocationModule {}
