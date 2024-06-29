import { SolicitationFormRepository as DomainSolicitationRepository } from "src/domain/portal/application/repositories/repair/solicitation-form.repository"
import { SolicitationFormDTO } from "src/domain/portal/application/dto/solicitation-form.dto"
import { SolicitationForm } from "../../model/repair/form.model"

export class SequelizeSolicitationFormRepository
  implements DomainSolicitationRepository
{
  async createSolicitationForm(
    solicitationFormPayload: SolicitationFormDTO,
  ): Promise<number> {
    const result = await SolicitationForm.create({
      brand: solicitationFormPayload.brand,
      model: solicitationFormPayload.model,
      imei_num: solicitationFormPayload.imeiNumber,
      usage_time: solicitationFormPayload.usageTime,
      problem_desc: solicitationFormPayload.problemDescription,
      problem_cause: solicitationFormPayload.problemCause,
      previous_repair: solicitationFormPayload.previousRepair,
      original_hardware: solicitationFormPayload.originalHardware,
    })
    return result.id
  }

  async insertSolicitationId(
    solicitationFormId: number,
    solicitationId: string,
  ): Promise<void> {
    const result = await SolicitationForm.update(
      { fk_id_solicitation: solicitationId },
      { where: { id: solicitationFormId } },
    )
    console.log(result)
  }
}
