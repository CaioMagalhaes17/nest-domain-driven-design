import { Module } from "@nestjs/common"
import { SolicitationsConsumerModule } from "./solicitations/solicitations.module"

@Module({
  imports: [SolicitationsConsumerModule],
})
export class ConsumersModule {}
