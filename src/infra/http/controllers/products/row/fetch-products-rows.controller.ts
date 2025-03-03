import { FetchProductsRowsUseCase } from "@/domain/portal/application/use-cases/products/row/fetch-products-rows"
import { Controller, Get, Req, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchProductsRowsUseCaseController {
  constructor(private fetchProductsRowsUseCase: FetchProductsRowsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/products/row")
  async handle(@Req() req: { user: { profileId: string } }) {
    const response = await this.fetchProductsRowsUseCase.execute(
      req.user.profileId,
    )

    return response
  }
}
