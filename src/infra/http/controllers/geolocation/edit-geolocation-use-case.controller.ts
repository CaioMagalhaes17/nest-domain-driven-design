import { GeolocationIncorrectValues } from "@/domain/portal/application/errors/geolocation/incorrect-geolocation"
import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
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
  @Put("/geolocation")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Body()
    createGeolocation: { longitude: number; latitude: number; radius?: number },
  ) {
    const response = await this.editGeolocationUseCase.execute(
      req.user.profileId,
      createGeolocation,
    )

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case GeolocationNotFound:
          throw new NotFoundException(response.value.message)
        case ProfileActionNotAllowed:
          throw new BadRequestException(response.value.message)
        case GeolocationIncorrectValues:
          throw new BadRequestException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    return response
  }
}
