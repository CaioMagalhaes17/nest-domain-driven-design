import { Controller, Get, Query, UseGuards } from "@nestjs/common"
import { FetchStoresInsideRadiusUseCase } from "src/domain/portal/application/use-cases/geolocation/fetch-stores-inside-radius-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchStoresInsideRadiusUseCaseController {
  constructor(
    private fetchStoresInsideRadiusUseCase: FetchStoresInsideRadiusUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("/stores/in-range")
  async handle(
    @Query("latitude") latitude: string,
    @Query("longitude") longitude: string,
    @Query("radius") radius: string,
  ) {
    const response = await this.fetchStoresInsideRadiusUseCase.execute({
      latitude,
      longitude,
      radius,
    })

    return response
  }
}
