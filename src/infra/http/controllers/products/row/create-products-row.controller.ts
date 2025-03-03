import { CreateProductsRowUseCase } from "@/domain/portal/application/use-cases/products/row/create-products-row"
import { ProductsRow } from "@/domain/portal/enterprise/products/products-row"
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class CreateProductsRowUseCaseController {
  constructor(private createProductsRowUseCase: CreateProductsRowUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/products/row")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Body() createGeolocation: Partial<ProductsRow>,
  ) {
    const response = await this.createProductsRowUseCase.execute(
      req.user.profileId,
      createGeolocation,
    )

    return response
  }
}
