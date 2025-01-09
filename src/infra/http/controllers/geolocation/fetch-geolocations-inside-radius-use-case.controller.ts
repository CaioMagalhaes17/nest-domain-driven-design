import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"
import { FetchGeolocationInsideRadiusUseCase } from "@/domain/portal/application/use-cases/geolocation/fetch-geolocations-inside-radius"
import { GeolocationNotFound } from "@/domain/portal/application/errors/geolocation/geolocation-not-found"
import { GeolocationIncorrectValues } from "@/domain/portal/application/errors/geolocation/incorrect-geolocation"

@Controller()
export class FetchGeolocationsInsideRadiusUseCaseController {
  constructor(
    private fetchGeolocationInsideRadiusUseCase: FetchGeolocationInsideRadiusUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("/geolocation/inside/radius")
  async handle(
    @Query("latitude") latitude: number,
    @Query("longitude") longitude: number,
    @Query("radius") radius: number,
  ) {
    const response = await this.fetchGeolocationInsideRadiusUseCase.execute(
      latitude,
      longitude,
      radius,
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
