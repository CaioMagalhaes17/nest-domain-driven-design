import { Module } from "@nestjs/common"
import { CreateBudgetUseCaseController } from "./create-budget-use-case.controller"
import { CreateBudgetUseCase } from "src/domain/portal/application/use-cases/budget/create-budget-use-case"
import { SolicitationRepository } from "src/domain/portal/application/repositories/repair/solicitation-repository"
import { BudgetRepository } from "src/domain/portal/application/repositories/repair/budget-repository"
import { BudgetDatabaseModule } from "src/infra/databases/budget-database.module"
import { SolicitationDatabaseModule } from "src/infra/databases/solicitation-database.module"

@Module({
  imports: [BudgetDatabaseModule, SolicitationDatabaseModule],
  controllers: [CreateBudgetUseCaseController],
  providers: [
    {
      provide: CreateBudgetUseCase,
      useFactory: (
        budgetRepository: BudgetRepository,
        solicitationRepository: SolicitationRepository,
      ) => {
        return new CreateBudgetUseCase(budgetRepository, solicitationRepository)
      },
      inject: [BudgetRepository, SolicitationRepository],
    },
  ],
})
export class BudgetModule {}
