import { CreateProductUseCase } from "@/domain/portal/application/use-cases/products/product/create-product"
import { Product } from "@/domain/portal/enterprise/products/product"
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class CreateProductUseCaseController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/product")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Body() createGeolocation: Partial<Product>,
  ) {
    const response = await this.createProductUseCase.execute(
      req.user.profileId,
      createGeolocation,
    )

    return response
  }
}
