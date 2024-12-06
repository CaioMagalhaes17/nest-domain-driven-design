import { Module } from "@nestjs/common"
import { getModelToken, MongooseModule } from "@nestjs/mongoose"

import {
  Solicitation,
  SolicitationSchema,
} from "./schemas/repair/solicitation.schema"
import { InfraSolicitationRepository } from "./repositories/solicitation.repository"
import { Model } from "mongoose"
import { InfraSolicitationFormRepository } from "./repositories/solicitation-form.repository"
import {
  SolicitationForm,
  SolicitationFormSchema,
} from "./schemas/repair/solicitation-form.schema"
import { SolicitationMapper } from "./mappers/repair/solicitation.mapper"
import { SolicitationFormMapper } from "./mappers/repair/solicitation-form.mapper"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Solicitation.name, schema: SolicitationSchema },
    ]),
    MongooseModule.forFeature([
      { name: SolicitationForm.name, schema: SolicitationFormSchema },
    ]),
  ],
  providers: [
    SolicitationMapper,
    SolicitationFormMapper,
    {
      provide: InfraSolicitationRepository,
      useFactory: (
        solicitationModel: Model<Solicitation>,
        mapper: SolicitationMapper,
      ) => {
        return new InfraSolicitationRepository(solicitationModel, mapper)
      },
      inject: [getModelToken(Solicitation.name), SolicitationMapper],
    },
    {
      provide: InfraSolicitationFormRepository,
      useFactory: (
        solicitationFormModel: Model<SolicitationForm>,
        mapper: SolicitationFormMapper,
      ) => {
        return new InfraSolicitationFormRepository(
          solicitationFormModel,
          mapper,
        )
      },
      inject: [getModelToken(SolicitationForm.name), SolicitationFormMapper],
    },
  ],
  exports: [InfraSolicitationRepository, InfraSolicitationFormRepository],
})
export class SolicitationMongoModule {}
