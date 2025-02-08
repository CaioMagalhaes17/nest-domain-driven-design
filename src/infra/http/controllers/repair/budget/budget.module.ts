import { Module } from "@nestjs/common"
import { CreateBudgetUseCaseController } from "./create-budget-use-case.controller"
import { CreateBudgetUseCase } from "src/domain/portal/application/use-cases/budget/create-budget-use-case"
import { IBudgetRepository } from "src/domain/portal/application/repositories/repair/budget-repository"
import { FetchBudgetsUseCase } from "src/domain/portal/application/use-cases/budget/fetch-budgets-use-case"
import { FetchBudgetsUseCaseController } from "./fetch-budgets-use-case.controller"
import { FetchBudgetUseCase } from "src/domain/portal/application/use-cases/budget/fetch-budget-use-case"
import { FetchBudgetUseCaseController } from "./fetch.budget-use-case.controller"
import { DeleteBudgetUseCase } from "src/domain/portal/application/use-cases/budget/delete-budget-use-case"
import { DeleteBudgetUseCaseController } from "./delete-budget-use-case.controller"
import { SolicitationMongoModule } from "@/infra/databases/mongo/solicitation.module"
import { ISolicitationRepository } from "@/domain/portal/application/repositories/repair/solicitation-repository.interface"
import { BudgetMongoModule } from "@/infra/databases/mongo/budget.module"
import { InfraBudgetRepository } from "@/infra/databases/mongo/repositories/repair/budget/budget.repository"
import { InfraSolicitationRepository } from "@/infra/databases/mongo/repositories/repair/solicitation/solicitation.repository"
import { FetchStoreBudgetBySolicitationUseCase } from "@/domain/portal/application/use-cases/budget/fetch-store-budgets-by-solicitation"
import { FetchBudgetsBySolicitationUseCase } from "@/domain/portal/application/use-cases/budget/fetch-budgets-by-solicitation"
import { FetchBudgetsBySolicitationUseCaseController } from "./fetch-budgets-by-solicitation-use-case.controller"
import { FetchStoreBudgetBySolicitationUseCaseController } from "./fetch-store-budgets-by-solicitation-use-case.controller"

@Module({
  imports: [SolicitationMongoModule, BudgetMongoModule],
  controllers: [
    CreateBudgetUseCaseController,
    FetchBudgetsUseCaseController,
    FetchBudgetUseCaseController,
    DeleteBudgetUseCaseController,
    FetchBudgetsBySolicitationUseCaseController,
    FetchStoreBudgetBySolicitationUseCaseController,
  ],
  providers: [
    {
      provide: CreateBudgetUseCase,
      useFactory: (
        budgetRepository: IBudgetRepository,
        solicitationRepository: ISolicitationRepository,
      ) => {
        return new CreateBudgetUseCase(budgetRepository, solicitationRepository)
      },
      inject: [InfraBudgetRepository, InfraSolicitationRepository],
    },
    {
      provide: FetchBudgetsUseCase,
      useFactory: (budgetRepository: IBudgetRepository) => {
        return new FetchBudgetsUseCase(budgetRepository)
      },
      inject: [InfraBudgetRepository],
    },
    {
      provide: FetchStoreBudgetBySolicitationUseCase,
      useFactory: (budgetRepository: IBudgetRepository) => {
        return new FetchStoreBudgetBySolicitationUseCase(budgetRepository)
      },
      inject: [InfraBudgetRepository],
    },
    {
      provide: FetchBudgetsBySolicitationUseCase,
      useFactory: (budgetRepository: IBudgetRepository) => {
        return new FetchBudgetsBySolicitationUseCase(budgetRepository)
      },
      inject: [InfraBudgetRepository],
    },
    {
      provide: FetchBudgetUseCase,
      useFactory: (budgetRepository: IBudgetRepository) => {
        return new FetchBudgetUseCase(budgetRepository)
      },
      inject: [InfraBudgetRepository],
    },
    {
      provide: DeleteBudgetUseCase,
      useFactory: (budgetRepository: IBudgetRepository) => {
        return new DeleteBudgetUseCase(budgetRepository)
      },
      inject: [InfraBudgetRepository],
    },
  ],
})
export class BudgetModule {}
