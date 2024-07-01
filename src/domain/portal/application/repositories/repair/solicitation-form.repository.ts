import { SolicitationFormDTO } from "../../dto/solicitation-form.dto"

export abstract class SolicitationFormRepository {
  abstract createSolicitationForm(
    solicitationFormPayload: SolicitationFormDTO,
  ): Promise<number>
  abstract insertSolicitationId(
    solicitationFormId: number,
    solicitationId: number,
  ): Promise<void>
  abstract update(solicitationId: string, updatePayload: any): Promise<void>
}
