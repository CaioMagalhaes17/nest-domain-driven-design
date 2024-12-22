import { Module } from "@nestjs/common"
import { getModelToken, MongooseModule } from "@nestjs/mongoose"
import { Budget, BudgetSchema } from "./schemas/repair/budget.schema"
import { BudgetMapper } from "./mappers/repair/budget.mapper"
import { InfraBudgetRepository } from "./repositories/repair/budget/budget.repository"
import { Model } from "mongoose"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Budget.name, schema: BudgetSchema }]),
  ],
  providers: [
    BudgetMapper,
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
