import { SearchProductsUseCase } from "@/domain/portal/application/use-cases/products/product/search-produtcs"
import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class SearchProductsUseCaseController {
  constructor(private searchProductsUseCase: SearchProductsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/product/search")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Query("name") name: string,
  ) {
    const products = await this.searchProductsUseCase.execute(name)
    return products
  }
}
