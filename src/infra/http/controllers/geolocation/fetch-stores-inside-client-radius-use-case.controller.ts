import { Controller, Get, Req, UseGuards } from "@nestjs/common"
import { FetchStoresInsideClientRadiusUseCase } from "@/domain/portal/application/use-cases/geolocation/fetch-stores-inside-client-radius-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchStoresInsideClientRadiusUseCaseController {
  constructor(
    private fetchStoresInsideRadiusUseCase: FetchStoresInsideClientRadiusUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("/geolocation/stores/in-range")
  async handle(@Req() req: { user: { id: string } }) {
    const response = await this.fetchStoresInsideRadiusUseCase.execute(
      req.user.id,
    )

    return response
  }
}
