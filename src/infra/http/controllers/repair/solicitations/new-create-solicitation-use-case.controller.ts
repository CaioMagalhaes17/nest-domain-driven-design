import { CreateSolicitationUseCase } from "@/domain/portal/application/use-cases/solicitations/new-create-solicitation-use-case"
import { Controller, Post, Req, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class CreateSolicitationUseCaseController {
  constructor(private createSolicitationsUseCase: CreateSolicitationUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/teste/asd")
  async handle(@Req() req: { user: { id: number } }) {
    const response = await this.createSolicitationsUseCase.execute({
      status: "PENDENTE",
      fk_id_user: req.user.id,
    })
    return response
  }
}
