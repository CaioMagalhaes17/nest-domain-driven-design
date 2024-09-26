import { Module } from "@nestjs/common"
import { FetchUserSolicitationsUseCaseController } from "./fetch-user-solicitations-use-case.controller"
import { CreateSolicitationUseCaseController } from "./create-solicitation-use-case.controller"
import { EditSolicitationUseCaseController } from "./edit-solicitation-use-case.controller"
import { DeleteSolicitationUseCaseController } from "./delete-solicitation-use-case.controller"
import { FetchUserSolicitationsUseCase } from "src/domain/portal/application/use-cases/solicitations/fetch-user-solicitations-use-case"
import { SolicitationRepository } from "src/domain/portal/application/repositories/repair/solicitation-repository"
import { CreateSolicitationUseCase } from "src/domain/portal/application/use-cases/solicitations/create-solicitation-use-case"
import { SolicitationFormRepository } from "src/domain/portal/application/repositories/repair/solicitation-form.repository"
import { EditSolicitationUseCase } from "src/domain/portal/application/use-cases/solicitations/edit-solicitation-use-case"
import { DeleteSolicitationUseCase } from "src/domain/portal/application/use-cases/solicitations/delete.solicitation-use-case"
import { SolicitationDatabaseModule } from "src/infra/databases/solicitation-database.module"
import { FetchSolicitationUseCaseController } from "./fetch-solicitation-use-case.controller"
import { FetchSolicitationUseCase } from "src/domain/portal/application/use-cases/solicitations/fetch-solicitation-use-case"
import { FetchAvaliableSolicitationsToStoreUseCase } from "src/domain/portal/application/use-cases/solicitations/fetch-avaliable-solicitations-to-store-use-case"
import { FetchGeolocationCoveringStoreUseCase } from "src/domain/portal/application/use-cases/geolocation/fetch-geolocation-covering-use-case"
import { FetchGeolocationUseCase } from "src/domain/portal/application/use-cases/geolocation/fetch-geolocation-use-case"
import { FetchAvaliableSolicitationsToStoreUseCaseController } from "./fetch-avaliable-solicitations-to-store-use-case.controller"
import { GeolocationModule } from "../../geolocation/geolocation.module"
import { OnSolicitationCreatedUseCase } from "src/domain/portal/application/use-cases/solicitations/on-solicitation-created-use-case"
import { EventStreamingGateway } from "src/domain/portal/application/gateway/event-streaming/event-streaming.gateway"
import { FetchStoresInsideRadiusUseCase } from "src/domain/portal/application/use-cases/geolocation/fetch-stores-inside-radius-use-case"
import { EventStreamingModule } from "src/infra/gateways/event-streaming/event-streaming.module"

@Module({
  imports: [
    SolicitationDatabaseModule,
    GeolocationModule,
    EventStreamingModule,
  ],
  controllers: [
    FetchSolicitationUseCaseController,
    FetchUserSolicitationsUseCaseController,
    CreateSolicitationUseCaseController,
    EditSolicitationUseCaseController,
    DeleteSolicitationUseCaseController,
    FetchAvaliableSolicitationsToStoreUseCaseController,
  ],
  providers: [
    {
      provide: FetchUserSolicitationsUseCase,
      useFactory: (solicitationRepository: SolicitationRepository) => {
        return new FetchUserSolicitationsUseCase(solicitationRepository)
      },
      inject: [SolicitationRepository],
    },
    {
      provide: FetchAvaliableSolicitationsToStoreUseCase,
      useFactory: (
        fetchGeolocationCoveringUseCase: FetchGeolocationCoveringStoreUseCase,
        fetchGeolocationUseCase: FetchGeolocationUseCase,
        fetchUserSolicitationsUseCase: FetchUserSolicitationsUseCase,
      ) => {
        return new FetchAvaliableSolicitationsToStoreUseCase(
          fetchGeolocationCoveringUseCase,
          fetchGeolocationUseCase,
          fetchUserSolicitationsUseCase,
        )
      },
      inject: [
        FetchGeolocationCoveringStoreUseCase,
        FetchGeolocationUseCase,
        FetchUserSolicitationsUseCase,
      ],
    },
    {
      provide: CreateSolicitationUseCase,
      useFactory: (
        solicitationRepository: SolicitationRepository,
        solicitationFormRepository: SolicitationFormRepository,
        onSolicitationCreatedUseCase: OnSolicitationCreatedUseCase,
      ) => {
        return new CreateSolicitationUseCase(
          solicitationRepository,
          solicitationFormRepository,
          onSolicitationCreatedUseCase,
        )
      },
      inject: [
        SolicitationRepository,
        SolicitationFormRepository,
        OnSolicitationCreatedUseCase,
      ],
    },
    {
      provide: EditSolicitationUseCase,
      useFactory: (
        solicitationRepository: SolicitationRepository,
        solicitationFormRepository: SolicitationFormRepository,
      ) => {
        return new EditSolicitationUseCase(
          solicitationRepository,
          solicitationFormRepository,
        )
      },
      inject: [SolicitationRepository, SolicitationFormRepository],
    },
    {
      provide: DeleteSolicitationUseCase,
      useFactory: (
        solicitationRepository: SolicitationRepository,
        solicitationFormRepository: SolicitationFormRepository,
      ) => {
        return new DeleteSolicitationUseCase(
          solicitationRepository,
          solicitationFormRepository,
        )
      },
      inject: [SolicitationRepository, SolicitationFormRepository],
    },
    {
      provide: FetchSolicitationUseCase,
      useFactory: (solicitationRepository: SolicitationRepository) => {
        return new FetchSolicitationUseCase(solicitationRepository)
      },
      inject: [SolicitationRepository],
    },
    {
      provide: OnSolicitationCreatedUseCase,
      useFactory: (
        eventStreamingGateway: EventStreamingGateway,
        fetchStoresInsideRadiusUseCase: FetchStoresInsideRadiusUseCase,
        fetchGeolocationUseCase: FetchGeolocationUseCase,
      ) => {
        return new OnSolicitationCreatedUseCase(
          eventStreamingGateway,
          fetchStoresInsideRadiusUseCase,
          fetchGeolocationUseCase,
        )
      },
      inject: [
        EventStreamingGateway,
        FetchStoresInsideRadiusUseCase,
        FetchGeolocationUseCase,
      ],
    },
  ],
})
export class SolicitationsModule {}
