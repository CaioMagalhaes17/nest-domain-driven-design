import { Module } from "@nestjs/common"
import { DataBaseModule } from "../databases/database.module"
import { UserModule } from "./controllers/user/user.module"
import { SolicitationsModule } from "./controllers/repair/solicitations/solicitations.module"
import { BudgetModule } from "./controllers/repair/budget/budget.module"
import { ClientProfileModule } from "./controllers/profile/client/client-profile.module"

@Module({
  imports: [
    DataBaseModule,
    UserModule,
    SolicitationsModule,
    BudgetModule,
    ClientProfileModule,
  ],
})
export class HttpModule {}
