import { BaseMapper } from "@/core/infra/base.mapper"
import { Budget as MongoBudget } from "../../schemas/repair/budget.schema"
import { Budget } from "@/domain/portal/enterprise/repair/budget"
import { Solicitation } from "@/domain/portal/enterprise/repair/solicitation"

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

  toDomainWithSolicitation(row: MongoBudget): Budget {
    const { _id, solicitation, ...rest } = row.toObject()
    const tentativa = Budget.create(
      {
        solicitation: Solicitation.create(solicitation, solicitation._id),
        ...rest,
      },
      _id,
    )
    return tentativa
  }
}
