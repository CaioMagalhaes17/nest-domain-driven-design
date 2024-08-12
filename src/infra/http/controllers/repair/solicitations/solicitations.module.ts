import { Module } from "@nestjs/common"
import { FetchSolicitationsUseCaseController } from "./fetch-solicitations-use-case.controller"
import { CreateSolicitationUseCaseController } from "./create-solicitation-use-case.controller"
import { EditSolicitationUseCaseController } from "./edit-solicitation-use-case.controller"
import { DeleteSolicitationUseCaseController } from "./delete-solicitation-use-case.controller"
import { FetchSolicitationsUseCase } from "src/domain/portal/application/use-cases/solicitations/fetch-solicitations-use-case"
import { SolicitationRepository } from "src/domain/portal/application/repositories/repair/solicitation-repository"
import { CreateSolicitationUseCase } from "src/domain/portal/application/use-cases/solicitations/create-solicitation-use-case"
import { SolicitationFormRepository } from "src/domain/portal/application/repositories/repair/solicitation-form.repository"
import { EditSolicitationUseCase } from "src/domain/portal/application/use-cases/solicitations/edit-solicitation-use-case"
import { DeleteSolicitationUseCase } from "src/domain/portal/application/use-cases/solicitations/delete.solicitation-use-case"
import { SolicitationDatabaseModule } from "src/infra/databases/solicitation-database.module"
import { FetchSolicitationUseCaseController } from "./fetch-solicitation-use-case.controller"
import { FetchSolicitationUseCase } from "src/domain/portal/application/use-cases/solicitations/fetch-solicitation-use-case"

@Module({
  imports: [SolicitationDatabaseModule],
  controllers: [
    FetchSolicitationUseCaseController,
    FetchSolicitationsUseCaseController,
    CreateSolicitationUseCaseController,
    EditSolicitationUseCaseController,
    DeleteSolicitationUseCaseController,
  ],
  providers: [
    {
      provide: FetchSolicitationsUseCase,
      useFactory: (solicitationRepository: SolicitationRepository) => {
        return new FetchSolicitationsUseCase(solicitationRepository)
      },
      inject: [SolicitationRepository],
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
