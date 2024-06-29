import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common"
import { SolicitationFormDTO } from "src/domain/portal/application/dto/solicitation-form.dto"
import { CreateSolicitationUseCase } from "src/domain/portal/application/use-cases/solicitations/create-solicitation-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class CreateSolicitationUseCaseController {
  constructor(private createSolicitationsUseCase: CreateSolicitationUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/repair/solicitation")
  async handle(
    @Req() req: { user: { id: string } },
    @Body() solicitationFormPayload: SolicitationFormDTO,
  ) {
    const response = await this.createSolicitationsUseCase.execute(
      solicitationFormPayload,
      req.user.id,
    )
    return response
  }
}
