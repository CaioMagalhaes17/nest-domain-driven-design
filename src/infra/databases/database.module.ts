import { Module } from "@nestjs/common"
import { SolicitationDatabaseModule } from "./solicitation-database.module"
import { UserDatabaseModule } from "./user-database.module"
import { BudgetDatabaseModule } from "./budget-database.module"
import { ClientProfileDatabaseModule } from "./client-profile-database.module"
import { GeolocationDatabaseModule } from "./geolocation-database.module"

@Module({
  imports: [
    UserDatabaseModule,
    SolicitationDatabaseModule,
    BudgetDatabaseModule,
    ClientProfileDatabaseModule,
    GeolocationDatabaseModule,
  ],

  exports: [
    UserDatabaseModule,
    SolicitationDatabaseModule,
    BudgetDatabaseModule,
    ClientProfileDatabaseModule,
    GeolocationDatabaseModule,
  ],
})
export class DataBaseModule {}
