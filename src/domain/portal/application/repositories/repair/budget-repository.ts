import { Budget } from "src/domain/portal/enterprise/repair/budget"
import { BudgetInsertType } from "../../dto/budget/repository/budget-insert"
import { BudgetUpdateType } from "../../dto/budget/repository/budget-update"

export abstract class BudgetRepository {
  abstract fetchById(budgetId: number): Promise<Budget>

  abstract fetchByUser(userId: number): Promise<Budget[] | void>

  abstract insert(insertPayload: BudgetInsertType): Promise<number>

  abstract update(
    updatePayload: BudgetUpdateType,
    budgetId: number,
  ): Promise<Budget>

  abstract delete(budgetId: number): Promise<void>

  abstract fetchBySolicitationId(solicitationId: number): Promise<Budget | void>
}
