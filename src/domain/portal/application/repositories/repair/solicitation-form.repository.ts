import { SolicitationFormDTO } from "../../dto/solicitation-form.dto"

export abstract class SolicitationFormRepository {
  abstract createSolicitationForm(
    solicitationFormPayload: SolicitationFormDTO,
  ): Promise<number>
  abstract insertSolicitationId(
    solicitationFormId: number,
    solicitationId: string,
  ): Promise<void>
}
