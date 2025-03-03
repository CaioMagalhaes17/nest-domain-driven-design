import { ActionNotAllowedError } from "@/domain/portal/application/errors/repair/solicitations/ActionNotAllowed"
import { UpdateProductsRowUseCase } from "@/domain/portal/application/use-cases/products/row/update-products-row"
import { ProductsRow } from "@/domain/portal/enterprise/products/products-row"
import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class UpdateProductsRowUseCaseController {
  constructor(private updateProductsRowUseCase: UpdateProductsRowUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Put("/products/row/:id")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Body() createGeolocation: Partial<ProductsRow>,
    @Param("id") id: string,
  ) {
    const response = await this.updateProductsRowUseCase.execute(
      req.user.profileId,
      id,
      createGeolocation,
    )

    if (response.isLeft()) {
      switch (response.value.constructor) {
        case NotFoundException:
          throw new NotFoundException(response.value.message)
        case ActionNotAllowedError:
          throw new ActionNotAllowedError()
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    return response
  }
}
