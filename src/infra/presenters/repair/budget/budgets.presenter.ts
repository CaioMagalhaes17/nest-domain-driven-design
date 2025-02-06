import { Budget } from "src/domain/portal/enterprise/repair/budget"

export class BudgetsPresenter {
  static toHttp(budget: Budget) {
    return {
      id: budget.id,
      startValue: budget.startValue,
      endValue: budget.endValue,
      details: budget.details,
      userId: budget.userId,
      solicitationId: budget.solicitationId,
      createdAt: budget.createdAt,
      updatedAt: budget.updatedAt,
    }
  }
}
