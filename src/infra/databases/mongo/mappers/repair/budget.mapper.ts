import { BaseMapper } from "@/core/infra/base.mapper"
import { Budget as MongoBudget } from "../../schemas/repair/budget.schema"
import { Budget } from "@/domain/portal/enterprise/repair/budget"
import { StoreProfile } from "@/domain/portal/enterprise/profile/store/store-profile"
import { Solicitation } from "@/domain/portal/enterprise/repair/solicitation"

export class BudgetMapper implements BaseMapper<MongoBudget, Budget> {
  toDomainArray(rows: MongoBudget[]): Budget[] {
    if (!rows || rows.length === 0) return []
    return rows.map((row) => this.toDomain(row)).filter((item) => item !== null)
  }

  toDomain(row: MongoBudget): Budget {
    const { _id, solicitationId, storeProfileId, ...rest } = row.toObject()
    const tentativa = Budget.create(
      {
        solicitation: Solicitation.create(solicitationId, solicitationId._id),
        storeProfile: StoreProfile.create(storeProfileId, storeProfileId._id),
        ...rest,
      },
      _id,
    )
    return tentativa
  }
}
