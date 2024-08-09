import { BudgetRepository } from "src/domain/portal/application/repositories/repair/budget-repository"
import { Budget } from "src/domain/portal/enterprise/repair/budget"
import { Budget as SequelizeBudgetModel } from "../../../model/repair/budget.model"
import { BudgetMapper } from "../../../mappers/repair/budget/budget-mapper"
import { BudgetInsertType } from "src/domain/portal/application/dto/budget/repository/budget-insert"
import { BudgetUpdateType } from "src/domain/portal/application/dto/budget/repository/budget-update"

export class SequelizeBudgetRepository extends BudgetRepository {
  async fetchById(budgetId: string): Promise<Budget> {
    const result = await SequelizeBudgetModel.findByPk(budgetId)
    return BudgetMapper.toDomain(result)
  }

  async insert(insertPayload: BudgetInsertType): Promise<number> {
    const result = await SequelizeBudgetModel.create({
      fk_id_user: insertPayload.userId,
      status: insertPayload.status,
      estimated_price: insertPayload.estimatedPrice,
      fk_id_solicitation: insertPayload.solicitationId,
    })

    return result.id
  }

  async update(
    updatePayload: BudgetUpdateType,
    budgetId: string,
  ): Promise<Budget> {
    await SequelizeBudgetModel.update(updatePayload, {
      where: { id: budgetId },
    })

    return this.fetchById(budgetId)
  }

  async delete(budgetId: string): Promise<void> {
    await SequelizeBudgetModel.destroy({
      where: { id: budgetId },
    })
  }

  async fetchBySolicitationId(solicitationId: number): Promise<Budget | void> {
    const result = await SequelizeBudgetModel.findOne({
      where: { fk_id_solicitation: solicitationId },
    })
    if (result) {
      return BudgetMapper.toDomain(result)
    }
  }
}
