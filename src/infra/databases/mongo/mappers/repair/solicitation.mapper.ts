import { Solicitation } from "@/domain/portal/enterprise/repair/solicitation"
import { Solicitation as MongoSolicitation } from "../../schemas/repair/solicitation.schema"
import { BaseMapper } from "@/core/infra/base.mapper"
import { SolicitationForm } from "@/domain/portal/enterprise/repair/solicitation.form"
import { ClientProfile } from "@/domain/portal/enterprise/profile/client/client-profile"

export class SolicitationMapper
  implements BaseMapper<MongoSolicitation, Solicitation> {
  toDomainArray(rows: MongoSolicitation[]): Solicitation[] {
    if (!rows || rows.length === 0) return []
    return rows.map((row) => this.toDomain(row)).filter((item) => item !== null)
  }

  toDomain(row: MongoSolicitation): Solicitation {
    const { _id, solicitationFormId, clientProfileId, ...rest } = row.toObject()
    const tentativa = Solicitation.create(
      {
        form: SolicitationForm.create(
          solicitationFormId,
          solicitationFormId._id,
        ),
        clientProfile: ClientProfile.create(
          clientProfileId,
          clientProfileId._id,
        ),
        ...rest,
      },
      _id,
    )
    return tentativa
  }
}
