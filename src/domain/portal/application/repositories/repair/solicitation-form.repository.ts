import { SolicitationFormDTO } from "../../dto/solicitation-form.dto"

export abstract class SolicitationFormRepository {
  abstract createSolicitationForm(
    solicitationFormPayload: SolicitationFormDTO,
    solicitationId: number,
  ): Promise<number>
  abstract update(solicitationId: number, updatePayload: any): Promise<void>
  abstract deleteById(solicitationId: number): Promise<void>
}
