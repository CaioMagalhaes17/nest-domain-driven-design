import { Body, Controller, Put, Req, UseGuards } from "@nestjs/common"
import { EditGeolocationUseCase } from "src/domain/portal/application/use-cases/geolocation/edit-geolocation-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class EditGeolocationUseCaseController {
  constructor(private editGeolocationUseCase: EditGeolocationUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Put("/geoinfo")
  async handle(
    @Req() req: { user: { id: number } },
    @Body() createGeolocation,
  ) {
    const response = await this.editGeolocationUseCase.execute(
      req.user.id,
      createGeolocation,
    )

    return response
  }
}
