import { Module } from "@nestjs/common"
import { UserModule } from "./controllers/user/user.module"
import { SolicitationsModule } from "./controllers/repair/solicitations/solicitations.module"
import { BudgetModule } from "./controllers/repair/budget/budget.module"
import { ClientProfileModule } from "./controllers/profile/client/client-profile.module"
import { GeolocationModule } from "./controllers/geolocation/geolocation.module"
import { StoreProfileModule } from "./controllers/profile/store/store-profile.module"

@Module({
  imports: [
    UserModule,
    SolicitationsModule,
    // BudgetModule,
    // ClientProfileModule,
    // GeolocationModule,
    // StoreProfileModule,
  ],
})
export class HttpModule {}
