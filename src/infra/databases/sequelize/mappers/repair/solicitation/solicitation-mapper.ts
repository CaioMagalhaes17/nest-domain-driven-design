import { Solicitation } from "@/domain/portal/enterprise/repair/solicitation"
import { Solicitation as SequelizeInfraModel } from "../../../model/repair/solicitation.model"
import { SolicitationForm } from "src/domain/portal/enterprise/repair/solicitation.form"

export class SolicitationMapper {
  static toDomain(row: SequelizeInfraModel): Solicitation {
    return Solicitation.create(
      {
        userId: row.fk_id_user,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        status: row.status,
        form: SolicitationForm.create(
          {
            brand: row.solicitation_form.brand,
            model: row.solicitation_form.model,
            imeiNumber: row.solicitation_form.imei_num,
            usageTime: row.solicitation_form.usage_time,
            problemDescription: row.solicitation_form.problem_desc,
            problemCause: row.solicitation_form.problem_cause,
            previousRepair: row.solicitation_form.previous_repair,
            originalHardware:
              row.solicitation_form.original_hardware === "V" ? true : false,
            solicitationId: row.solicitation_form.fk_id_solicitation,
          },
          row.id,
        ),
      },
      row.id,
    )
  }
}
