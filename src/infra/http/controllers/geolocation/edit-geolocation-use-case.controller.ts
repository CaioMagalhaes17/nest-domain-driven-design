import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common"
import { GeolocationNotFound } from "src/domain/portal/application/errors/geolocation/geolocation-not-found"
import { ProfileActionNotAllowed } from "src/domain/portal/application/errors/profile/ProfileActionNotAllowed"
import { EditGeolocationUseCase } from "src/domain/portal/application/use-cases/geolocation/edit-geolocation-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class EditGeolocationUseCaseController {
  constructor(private editGeolocationUseCase: EditGeolocationUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Put("/geoinfo/:id")
  async handle(
    @Req() req: { user: { isCompany: boolean } },
    @Param("id") id: number,
    @Body() createGeolocation,
  ) {
    const response = await this.editGeolocationUseCase.execute(
      id,
      createGeolocation,
      req.user.isCompany,
    )

    if (response.isLeft()) {
      switch (response.value.constructor) {
        case GeolocationNotFound:
          throw new NotFoundException(response.value.message)
        case ProfileActionNotAllowed:
          throw new NotFoundException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    return response
  }
}
