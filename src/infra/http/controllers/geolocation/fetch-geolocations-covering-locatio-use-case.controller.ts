import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"
import { GeolocationNotFound } from "@/domain/portal/application/errors/geolocation/geolocation-not-found"
import { FetchGeolocationCoveringLocationUseCase } from "@/domain/portal/application/use-cases/geolocation/fetch-geolocations-covering-location"
import { GeolocationIncorrectValues } from "@/domain/portal/application/errors/geolocation/incorrect-geolocation"

@Controller()
export class FetchGeolocationsCoveringLocationUseCaseController {
  constructor(
    private fetchGeolocationCoveringLocationUseCase: FetchGeolocationCoveringLocationUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("/geolocation/inside/location")
  async handle(
    @Query("latitude") latitude: number,
    @Query("longitude") longitude: number,
  ) {
    const response = await this.fetchGeolocationCoveringLocationUseCase.execute(
      latitude,
      longitude,
    )

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case GeolocationNotFound:
          throw new NotFoundException(response.value.message)
        case GeolocationIncorrectValues:
          throw new BadRequestException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    return response
  }
}
