import { Module } from "@nestjs/common"
import { AuthModule } from "../auth.module"
import { EncrypterGateway } from "@/domain/portal/application/gateways/user/encrypter.gateway"
import { InfraCryptographyGateway } from "./cryptography.gateway"

@Module({
  imports: [AuthModule],
  providers: [
    {
      provide: EncrypterGateway,
      useClass: InfraCryptographyGateway,
    },
  ],
  exports: [EncrypterGateway],
})
export class CryptographyModule {}
