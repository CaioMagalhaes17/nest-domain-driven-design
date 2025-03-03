import { ActionNotAllowedError } from "@/domain/portal/application/errors/repair/solicitations/ActionNotAllowed"
import { UpdateProductUseCase } from "@/domain/portal/application/use-cases/products/product/update-product"
import { Product } from "@/domain/portal/enterprise/products/product"
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
export class UpdateProductUseCaseController {
  constructor(private updateProductUseCase: UpdateProductUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Put("/product/:id")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Body() createGeolocation: Partial<Product>,
    @Param("id") id: string,
  ) {
    const response = await this.updateProductUseCase.execute(
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
