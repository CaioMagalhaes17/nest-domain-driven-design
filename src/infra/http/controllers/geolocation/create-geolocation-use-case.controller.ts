import { GeolocationIncorrectValues } from "@/domain/portal/application/errors/geolocation/incorrect-geolocation"
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import { CreateGeolocationUseCase } from "src/domain/portal/application/use-cases/geolocation/create-geolocation-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class CreateGeolocationUseCaseController {
  constructor(private createGeolocationUseCase: CreateGeolocationUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/geolocation")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Body() createGeolocation,
  ) {
    const response = await this.createGeolocationUseCase.execute(
      createGeolocation,
      req.user.profileId,
    )

    if (response.isLeft()) {
      switch (response.value.constructor) {
        case GeolocationIncorrectValues:
          throw new BadRequestException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    return response
  }
}
