import { Module } from "@nestjs/common"
import { getModelToken, MongooseModule } from "@nestjs/mongoose"

import {
  Solicitation,
  SolicitationSchema,
} from "./schemas/repair/solicitation.schema"
import { InfraSolicitationRepository } from "./repositories/solicitation.repository"
import { Model } from "mongoose"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Solicitation.name, schema: SolicitationSchema },
    ]),
  ],
  providers: [
    {
      provide: InfraSolicitationRepository,
      useFactory: (solicitationModel: Model<Solicitation>) => {
        return new InfraSolicitationRepository(solicitationModel)
      },
      inject: [getModelToken(Solicitation.name)],
    },
  ],
  exports: [InfraSolicitationRepository],
})
export class SolicitationMongoModule {}
