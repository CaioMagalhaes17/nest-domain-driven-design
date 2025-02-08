import { Module } from "@nestjs/common"
import { getModelToken, MongooseModule } from "@nestjs/mongoose"
import { Budget, BudgetSchema } from "./schemas/repair/budget.schema"
import { BudgetMapper } from "./mappers/repair/budget.mapper"
import { InfraBudgetRepository } from "./repositories/repair/budget/budget.repository"
import { Model } from "mongoose"
import { SolicitationMapper } from "./mappers/repair/solicitation.mapper"
import { SolicitationMongoModule } from "./solicitation.module"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Budget.name, schema: BudgetSchema }]),
    SolicitationMongoModule,
  ],
  providers: [
    BudgetMapper,
    SolicitationMapper,
    {
      provide: InfraBudgetRepository,
      useFactory: (model: Model<Budget>, mapper: BudgetMapper) => {
        return new InfraBudgetRepository(model, mapper)
      },
      inject: [getModelToken(Budget.name), BudgetMapper],
    },
  ],
  exports: [InfraBudgetRepository],
})
export class BudgetMongoModule {}
