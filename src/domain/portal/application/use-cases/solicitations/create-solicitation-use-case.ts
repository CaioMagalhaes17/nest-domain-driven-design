import { SolicitationFormDTO } from "../../dto/solicitation-form.dto"
import { SolicitationDTO } from "../../dto/solicitation.dto"
import { SolicitationFormRepository } from "../../repositories/repair/solicitation-form.repository"
import { SolicitationRepository } from "../../repositories/repair/solicitation-repository"

export class CreateSolicitationUseCase {
  constructor(
    private solicitationRepository: SolicitationRepository,
    private solicitationFormRepository: SolicitationFormRepository,
  ) {}

  async execute(solicitationFormPayload: SolicitationFormDTO, userId: string) {
    const formId = await this.solicitationFormRepository.createSolicitationForm(
      solicitationFormPayload,
    )
    const solicitationPayload: SolicitationDTO = {
      userId,
      status: "pending",
      formId,
    }

    const solicitation =
      await this.solicitationRepository.createSolicitation(solicitationPayload)

    await this.solicitationFormRepository.insertSolicitationId(
      formId,
      solicitation.id,
    )
  }
}
