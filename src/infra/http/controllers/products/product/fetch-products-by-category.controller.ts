import { FetchProductsByCategoryUseCase } from "@/domain/portal/application/use-cases/products/product/fetch-products-by-category"
import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common"
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

    return response.value
  }
}
