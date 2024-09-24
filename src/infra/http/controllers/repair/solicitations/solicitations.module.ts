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

@Module({
  imports: [SolicitationDatabaseModule, GeolocationModule],
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
      ) => {
        return new FetchAvaliableSolicitationsToStoreUseCase(
          fetchGeolocationCoveringUseCase,
          fetchGeolocationUseCase,
        )
      },
      inject: [FetchGeolocationCoveringStoreUseCase, FetchGeolocationUseCase],
    },
    {
      provide: CreateSolicitationUseCase,
      useFactory: (
        solicitationRepository: SolicitationRepository,
        solicitationFormRepository: SolicitationFormRepository,
      ) => {
        return new CreateSolicitationUseCase(
          solicitationRepository,
          solicitationFormRepository,
        )
      },
      inject: [SolicitationRepository, SolicitationFormRepository],
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
  ],
})
export class SolicitationsModule {}
