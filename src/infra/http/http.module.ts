import { Module } from "@nestjs/common"
import { DataBaseModule } from "../databases/database.module"
import { FetchSolicitationsUseCase } from "src/domain/portal/application/use-cases/solicitations/fetch-solicitations-use-case"
import { FetchSolicitationsUseCaseController } from "./controllers/repair/solicitations/fetch-solicitations-use-case.controller"
import { SolicitationRepository } from "src/domain/portal/application/repositories/repair/solicitation-repository"
import { UserModule } from "./controllers/user/user.module"
import { CreateSolicitationUseCase } from "src/domain/portal/application/use-cases/solicitations/create-solicitation-use-case"
import { SolicitationFormRepository } from "src/domain/portal/application/repositories/repair/solicitation-form.repository"
import { CreateSolicitationUseCaseController } from "./controllers/repair/solicitations/create-solicitation-use-case.controller"

@Module({
  imports: [DataBaseModule, UserModule],
  controllers: [
    FetchSolicitationsUseCaseController,
    CreateSolicitationUseCaseController,
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
  ],
})
export class HttpModule {}
