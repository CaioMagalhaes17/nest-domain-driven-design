import { EmptyStoresInsideClientGeolocation } from "@/domain/portal/application/errors/geolocation/empty-stores-inside-client-geolocation"
import { GeolocationNotFound } from "@/domain/portal/application/errors/geolocation/geolocation-not-found"
import { FetchProductsByCategoryUseCase } from "@/domain/portal/application/use-cases/products/product/fetch-products-by-category"
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchProductsByCategoryUseCaseController {
  constructor(
    private fetchProductsByCategoryUseCase: FetchProductsByCategoryUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("/product/by-category/:category")
  async handle(
    @Param("category") category: string,
    @Req() req: { user: { profileId: string } },
  ) {
    const response = await this.fetchProductsByCategoryUseCase.execute(
      category,
      req.user.profileId,
    )

    if (response.isLeft()) {
      switch (response.value.constructor) {
        case GeolocationNotFound:
          throw new BadRequestException(response.value.message)
        case EmptyStoresInsideClientGeolocation:
          return []
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    return response.value
  }
}
