import { BaseMapper } from "@/core/infra/base.mapper"
import { Budget as MongoBudget } from "../../schemas/repair/budget.schema"
import { Budget } from "@/domain/portal/enterprise/repair/budget"
import { StoreProfile } from "@/domain/portal/enterprise/profile/store/store-profile"
import { SolicitationMapper } from "./solicitation.mapper"
import { Injectable } from "@nestjs/common"

@Injectable()
export class BudgetMapper implements BaseMapper<MongoBudget, Budget> {
  constructor(private solicitationMapper: SolicitationMapper) {}
  toDomainArray(rows: MongoBudget[]): Budget[] {
    if (!rows || rows.length === 0) return []
    return rows.map((row) => this.toDomain(row)).filter((item) => item !== null)
  }

  toDomain(row: MongoBudget): Budget {
    const { _id, storeProfileId, ...rest } = row.toObject()
    const tentativa = Budget.create(
      {
        solicitation: this.solicitationMapper.toDomain(row.solicitationId),
        storeProfile: StoreProfile.create(storeProfileId, storeProfileId._id),
        ...rest,
      },
      _id,
    )
    return tentativa
  }
}
