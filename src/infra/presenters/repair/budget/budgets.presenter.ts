import { Budget } from "src/domain/portal/enterprise/repair/budget"

export class BudgetsPresenter {
  static toHttp(budget: Budget) {
    return {
      id: budget.id,
      estimatedPrice: budget.estimatedPrice,
      status: budget.status,
      userId: budget.userId,
      solicitationId: budget.solicitationId,
      createdAt: budget.createdAt,
      updatedAt: budget.updatedAt,
    }
  }
}
