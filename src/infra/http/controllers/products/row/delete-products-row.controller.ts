import { ActionNotAllowedError } from "@/domain/portal/application/errors/repair/solicitations/ActionNotAllowed"
import { DeleteProductsRowUseCase } from "@/domain/portal/application/use-cases/products/row/delete-products-row"
import {
  BadRequestException,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class DeleteProductsRowUseCaseController {
  constructor(private deleteProductsRowUseCase: DeleteProductsRowUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Delete("/product/row/:id")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Param("id") id: string,
  ) {
    const response = await this.deleteProductsRowUseCase.execute(
      req.user.profileId,
      id,
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
