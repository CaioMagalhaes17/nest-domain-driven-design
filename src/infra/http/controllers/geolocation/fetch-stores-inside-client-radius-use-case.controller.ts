import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from "@nestjs/common"
import { FetchStoresInsideClientRadiusUseCase } from "@/domain/portal/application/use-cases/geolocation/fetch-stores-inside-client-radius-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"
import { GeolocationNotFound } from "@/domain/portal/application/errors/geolocation/geolocation-not-found"

@Controller()
export class FetchStoresInsideClientRadiusUseCaseController {
  constructor(
    private fetchStoresInsideRadiusUseCase: FetchStoresInsideClientRadiusUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("/geolocation/stores/in-range")
  async handle(@Req() req: { user: { id: string } }) {
    const response = await this.fetchStoresInsideRadiusUseCase.execute(
      req.user.id,
    )

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case GeolocationNotFound:
          throw new NotFoundException(response.value.message)
        default:
          throw new BadRequestException(
            "Erro não tratado: " + response?.value?.message,
          )
      }
    }
    return response
  }
}
