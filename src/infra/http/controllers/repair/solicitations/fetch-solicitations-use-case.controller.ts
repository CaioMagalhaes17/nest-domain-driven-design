import { Controller, Get, Req, UseGuards } from "@nestjs/common"
import { FetchSolicitationsUseCase } from "src/domain/portal/application/use-cases/solicitations/fetch-solicitations-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"
import { SolicitationsPresenter } from "src/infra/presenters/repair/solicitations/solicitations.presenter"

@Controller()
export class FetchSolicitationsUseCaseController {
  constructor(private fetchSolicitationsUseCase: FetchSolicitationsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/repair/solicitation")
  async handle(@Req() req: { user: { id: string } }) {
    const response = await this.fetchSolicitationsUseCase.execute(req.user.id)
    return {
      data: response.map((item) => SolicitationsPresenter.toHttp(item)),
    }
  }
}
