import { Module } from "@nestjs/common"
import { SolicitationsModule } from "./solicitations/solicitations.module"

@Module({
  imports: [SolicitationsModule],
})
export class ConsumersModule {}
