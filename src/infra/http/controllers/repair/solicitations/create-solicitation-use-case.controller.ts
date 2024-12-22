import { CreateSolicitationUseCase } from "@/domain/portal/application/use-cases/solicitations/create-solicitation-use-case"
import { SolicitationFormProps } from "@/domain/portal/enterprise/repair/solicitation.form"
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class CreateSolicitationUseCaseController {
  constructor(private createSolicitationsUseCase: CreateSolicitationUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/repair/solicitation")
  async handle(
    @Req() req: { user: { id: string } },
    @Body() solicitationForm: SolicitationFormProps,
  ) {
    console.log(req.user.id)
    const response = await this.createSolicitationsUseCase.execute({
      status: "PENDENTE",
      userId: req.user.id,
      solicitationForm,
    })
    return response
  }
}
