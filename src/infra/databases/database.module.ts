import { Module } from "@nestjs/common"
import { SolicitationDatabaseModule } from "./solicitation-database.module"
import { UserDatabaseModule } from "./user-database.module"
import { BudgetDatabaseModule } from "./budget-database.module"

@Module({
  imports: [
    UserDatabaseModule,
    SolicitationDatabaseModule,
    BudgetDatabaseModule,
  ],

  exports: [
    UserDatabaseModule,
    SolicitationDatabaseModule,
    BudgetDatabaseModule,
  ],
})
export class DataBaseModule {}
