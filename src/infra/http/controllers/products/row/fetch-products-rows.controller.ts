import { FetchProductsRowsUseCase } from "@/domain/portal/application/use-cases/products/row/fetch-products-rows"
import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchProductsRowsUseCaseController {
  constructor(private fetchProductsRowsUseCase: FetchProductsRowsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/product/rows/:id?")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Param("id") id?: string,
  ) {
    if (id) {
      const response = await this.fetchProductsRowsUseCase.execute(id, false)
      return response.value
    }
    const response = await this.fetchProductsRowsUseCase.execute(
      req.user.profileId,
      true,
    )
    return response.value
  }
}
