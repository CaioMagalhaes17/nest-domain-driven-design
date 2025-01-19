import { Module } from "@nestjs/common"
import { CreateGeolocationUseCaseController } from "./create-geolocation-use-case.controller"
import { CreateGeolocationUseCase } from "src/domain/portal/application/use-cases/geolocation/create-geolocation-use-case"
import { IGeolocationRepository } from "src/domain/portal/application/repositories/geolocation/geolocation-repository"
import { EditGeolocationUseCaseController } from "./edit-geolocation-use-case.controller"
import { EditGeolocationUseCase } from "src/domain/portal/application/use-cases/geolocation/edit-geolocation-use-case"
import { FetchGeolocationUseCase } from "src/domain/portal/application/use-cases/geolocation/fetch-geolocation-use-case"
import { FetchGeolocationUseCaseController } from "./fetch-geolocation-use-case.controller"
import { FetchStoresInsideClientRadiusUseCaseController } from "./fetch-stores-inside-client-radius-use-case.controller"
import { FetchStoresInsideClientRadiusUseCase } from "@/domain/portal/application/use-cases/geolocation/fetch-stores-inside-client-radius-use-case"
import { GeolocationMongoModule } from "@/infra/databases/mongo/geolocation.module"
import { InfraGeolocationRepository } from "@/infra/databases/mongo/repositories/geolocation/geolocation.repository"
import { FetchClientsInsideStoreLocationUseCaseController } from "./fetch-clients-inside-store-location-use-case.controller"
import { FetchClientsInsideStoreLocationUseCase } from "@/domain/portal/application/use-cases/geolocation/fetch-clients-inside-store-location-use-case"
import { FetchGeolocationsCoveringLocationUseCaseController } from "./fetch-geolocations-covering-locatio-use-case.controller"
import { FetchGeolocationsInsideRadiusUseCaseController } from "./fetch-geolocations-inside-radius-use-case.controller"
import { FetchGeolocationCoveringLocationUseCase } from "@/domain/portal/application/use-cases/geolocation/fetch-geolocations-covering-location"
import { FetchGeolocationInsideRadiusUseCase } from "@/domain/portal/application/use-cases/geolocation/fetch-geolocations-inside-radius"
import { FetchStoreProfileUseCase } from "@/domain/portal/application/use-cases/profile/store/fetch-store-profile"
import { StoreProfileModule } from "../profile/store/store-profile.module"

@Module({
  imports: [GeolocationMongoModule, StoreProfileModule],
  controllers: [
    CreateGeolocationUseCaseController,
    EditGeolocationUseCaseController,
    FetchGeolocationUseCaseController,
    FetchStoresInsideClientRadiusUseCaseController,
    FetchClientsInsideStoreLocationUseCaseController,
    FetchGeolocationsCoveringLocationUseCaseController,
    FetchGeolocationsInsideRadiusUseCaseController,
  ],
  providers: [
    {
      provide: CreateGeolocationUseCase,
      useFactory: (geolocationRepository: IGeolocationRepository) => {
        return new CreateGeolocationUseCase(geolocationRepository)
      },
      inject: [InfraGeolocationRepository],
    },
    {
      provide: EditGeolocationUseCase,
      useFactory: (geolocationRepository: IGeolocationRepository) => {
        return new EditGeolocationUseCase(geolocationRepository)
      },
      inject: [InfraGeolocationRepository],
    },
    {
      provide: FetchGeolocationUseCase,
      useFactory: (geolocationRepository: IGeolocationRepository) => {
        return new FetchGeolocationUseCase(geolocationRepository)
      },
      inject: [InfraGeolocationRepository],
    },
    // {
    //   provide: FetchGeolocationCoveringStoreUseCase,
    //   useFactory: (geolocationRepository: IGeolocationRepository) => {
    //     return new FetchGeolocationCoveringStoreUseCase(geolocationRepository)
    //   },
    //   inject: [InfraGeolocationRepository],
    // },
    {
      provide: FetchStoresInsideClientRadiusUseCase,
      useFactory: (
        geolocationRepository: IGeolocationRepository,
        fetchStoreUseCase: FetchStoreProfileUseCase,
      ) => {
        return new FetchStoresInsideClientRadiusUseCase(
          geolocationRepository,
          fetchStoreUseCase,
        )
      },
      inject: [InfraGeolocationRepository, FetchStoreProfileUseCase],
    },
    {
      provide: FetchClientsInsideStoreLocationUseCase,
      useFactory: (geolocationRepository: IGeolocationRepository) => {
        return new FetchClientsInsideStoreLocationUseCase(geolocationRepository)
      },
      inject: [InfraGeolocationRepository],
    },
    {
      provide: FetchGeolocationInsideRadiusUseCase,
      useFactory: (geolocationRepository: IGeolocationRepository) => {
        return new FetchGeolocationInsideRadiusUseCase(geolocationRepository)
      },
      inject: [InfraGeolocationRepository],
    },
    {
      provide: FetchGeolocationCoveringLocationUseCase,
      useFactory: (geolocationRepository: IGeolocationRepository) => {
        return new FetchGeolocationCoveringLocationUseCase(
          geolocationRepository,
        )
      },
      inject: [InfraGeolocationRepository],
    },
  ],
  exports: [
    FetchClientsInsideStoreLocationUseCase,
    FetchGeolocationUseCase,
    FetchStoresInsideClientRadiusUseCase,
  ],
})
export class GeolocationModule {}
