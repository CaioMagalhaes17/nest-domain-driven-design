import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common"
import { CreateGeolocationUseCase } from "src/domain/portal/application/use-cases/geolocation/create-geolocation-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class CreateGeolocationUseCaseController {
  constructor(private createGeolocationUseCase: CreateGeolocationUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/geoinfo")
  async handle(
    @Req() req: { user: { id: number; isStore: boolean } },
    @Body() createGeolocation,
  ) {
    const response = await this.createGeolocationUseCase.execute(
      createGeolocation,
      req.user,
    )

    return response
  }
}
