import { Sequelize } from "sequelize-typescript"
import { BudgetRepository } from "src/domain/portal/application/repositories/repair/budget-repository"
import { SequelizeBudgetRepository } from "./sequelize/repositories/repair/budget/budget.repository"
import { Module } from "@nestjs/common"

@Module({
  providers: [
    {
      provide: BudgetRepository,
      useFactory: () => {
        return new SequelizeBudgetRepository()
      },
      inject: [Sequelize],
    },
  ],
  exports: [BudgetRepository],
})
export class BudgetDatabaseModule {}
