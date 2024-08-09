import { Budget } from "src/domain/portal/enterprise/repair/budget"
import { Budget as BudgetInfraModel } from "../../../model/repair/budget.model"

export class BudgetMapper {
  static toDomain(row: BudgetInfraModel): Budget {
    return Budget.create(
      {
        userId: row.fk_id_user,
        estimatedPrice: row.estimated_price,
        solicitationId: row.fk_id_solicitation,
        status: row.status,
      },
      row.id,
    )
  }
}
