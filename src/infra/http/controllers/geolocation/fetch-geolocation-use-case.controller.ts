import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from "@nestjs/common"
import { GeolocationNotFound } from "src/domain/portal/application/errors/geolocation/geolocation-not-found"
import { ProfileActionNotAllowed } from "src/domain/portal/application/errors/profile/ProfileActionNotAllowed"
import { FetchGeolocationUseCase } from "src/domain/portal/application/use-cases/geolocation/fetch-geolocation-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchGeolocationUseCaseController {
  constructor(private fetchGeolocationUseCase: FetchGeolocationUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/geolocation")
  async handle(@Req() req: { user: { profileId: string } }) {
    const response = await this.fetchGeolocationUseCase.execute(
      req.user.profileId,
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

    const geolocation = response.value
    return geolocation
  }
}
