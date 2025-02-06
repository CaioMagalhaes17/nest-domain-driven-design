import { DeleteFlaggedSolicitationsUseCase } from "@/domain/portal/application/use-cases/solicitations/delete-flagged-solicitations-use-case"
import { Controller, Delete, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class DeleteFlaggedSolicitationsUseCaseController {
  constructor(
    private deleteFlaggedSolicitationsUseCase: DeleteFlaggedSolicitationsUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Delete("/repair/solicitation/flagged")
  async handle() {
    const response = await this.deleteFlaggedSolicitationsUseCase.execute()
    return response
  }
}
