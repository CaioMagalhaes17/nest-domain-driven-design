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
    const solicitationPayload: SolicitationDTO = {
      userId,
      status: "pending",
    }

    const solicitationId =
      await this.solicitationRepository.createSolicitation(solicitationPayload)

    await this.solicitationFormRepository.createSolicitationForm(
      solicitationFormPayload,
      solicitationId,
    )
  }
}
