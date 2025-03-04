import { FetchProductsRowUseCase } from "@/domain/portal/application/use-cases/products/row/fetch-products-row"
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchProductsRowUseCaseController {
  constructor(private fetchProductsRowUseCase: FetchProductsRowUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/product/row/:id")
  async handle(@Param("id") id: string) {
    const response = await this.fetchProductsRowUseCase.execute(id)

    if (response.isLeft()) {
      switch (response.value.constructor) {
        case NotFoundException:
          throw new NotFoundException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    return response.value
  }
}
