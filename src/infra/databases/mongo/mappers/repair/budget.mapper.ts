import { BaseMapper } from "@/core/infra/base.mapper"
import { Budget as MongoBudget } from "../../schemas/repair/budget.schema"
import { Budget } from "@/domain/portal/enterprise/repair/budget"

export class BudgetMapper implements BaseMapper<MongoBudget, Budget> {
  toDomain(row: MongoBudget): Budget {
    if (!row) return
    const { _id, ...rest } = row.toObject()
    return Budget.create(
      {
        ...rest,
      },
      _id,
    )
  }

  toDomainArray(rows: MongoBudget[]): Budget[] {
    if (!rows || rows.length === 0) return []
    return rows.map((row) => this.toDomain(row)).filter((item) => item !== null)
  }
}
