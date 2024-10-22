import { SolicitationFormDTO } from "../../dto/solicitation-form.dto"
import { SolicitationDTO } from "../../dto/solicitation.dto"
import { SolicitationFormRepository } from "../../repositories/repair/solicitation-form.repository"
import { SolicitationRepository } from "../../repositories/repair/solicitation-repository"
import { OnSolicitationCreatedUseCase } from "./on-solicitation-created-use-case"

export class CreateSolicitationUseCase {
  constructor(
    private solicitationRepository: SolicitationRepository,
    private solicitationFormRepository: SolicitationFormRepository,
    private onSolicitationCreatedUseCase: OnSolicitationCreatedUseCase,
  ) {}

  async execute(solicitationFormPayload: SolicitationFormDTO, userId: number) {
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

    await this.onSolicitationCreatedUseCase.execute(userId)
  }
}
