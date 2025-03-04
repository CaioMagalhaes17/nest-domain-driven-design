import { FetchProductsUseCase } from "@/domain/portal/application/use-cases/products/product/fetch-products"
import { Controller, Get, Req, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchProductsUseCaseController {
  constructor(private fetchProductsUseCase: FetchProductsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/product")
  async handle(@Req() req: { user: { profileId: string } }) {
    const response = await this.fetchProductsUseCase.execute(req.user.profileId)

    return response.value
  }
}
