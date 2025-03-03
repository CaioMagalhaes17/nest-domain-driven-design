import { FetchProductUseCase } from "@/domain/portal/application/use-cases/products/product/fetch-product"
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
export class FetchProductUseCaseController {
  constructor(private fetchProductUseCase: FetchProductUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/product/:id")
  async handle(@Param("id") id: string) {
    const response = await this.fetchProductUseCase.execute(id)

    if (response.isLeft()) {
      switch (response.value.constructor) {
        case NotFoundException:
          throw new NotFoundException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    return response
  }
}
