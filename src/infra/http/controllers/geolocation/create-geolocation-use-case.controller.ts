import { Body, Controller, Post, UseGuards } from "@nestjs/common"
import { CreateGeolocationUseCase } from "src/domain/portal/application/use-cases/geolocation/create-geolocation-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class CreateGeolocationUseCaseController {
  constructor(private createGeolocationUseCase: CreateGeolocationUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/geoinfo")
  async handle(@Body() createGeolocation) {
    const response =
      await this.createGeolocationUseCase.execute(createGeolocation)

    return response
  }
}
