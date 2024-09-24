import { Controller, Get, Req, UseGuards } from "@nestjs/common"
import { FetchAvaliableSolicitationsToStoreUseCase } from "src/domain/portal/application/use-cases/solicitations/fetch-avaliable-solicitations-to-store-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchAvaliableSolicitationsToStoreUseCaseController {
  constructor(
    private fetchAvaliableSolicitationsToStoreUseCase: FetchAvaliableSolicitationsToStoreUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("/repair/avaliable/solicitations")
  async handle(@Req() req: { user: { id: number } }) {
    const response =
      await this.fetchAvaliableSolicitationsToStoreUseCase.execute(req.user.id)

    return response
  }
}
