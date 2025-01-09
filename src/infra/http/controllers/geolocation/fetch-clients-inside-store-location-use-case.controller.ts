import { FetchClientsInsideStoreLocationUseCase } from "@/domain/portal/application/use-cases/geolocation/fetch-clients-inside-store-location-use-case"
import { Controller, Get, Req, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchClientsInsideStoreLocationUseCaseController {
  constructor(
    private fetchStoresInsideRadiusUseCase: FetchClientsInsideStoreLocationUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("/geolocation/clients/in-range")
  async handle(@Req() req: { user: { id: string } }) {
    const response = await this.fetchStoresInsideRadiusUseCase.execute(
      req.user.id,
    )

    return response
  }
}
