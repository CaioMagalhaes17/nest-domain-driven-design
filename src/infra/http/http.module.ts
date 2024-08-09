import { Module } from "@nestjs/common"
import { DataBaseModule } from "../databases/database.module"
import { UserModule } from "./controllers/user/user.module"
import { SolicitationsModule } from "./controllers/repair/solicitations/solicitations.module"
import { BudgetModule } from "./controllers/repair/budget/budget.module"

@Module({
  imports: [DataBaseModule, UserModule, SolicitationsModule, BudgetModule],
})
export class HttpModule {}
