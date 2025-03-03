import { ActionNotAllowedError } from "@/domain/portal/application/errors/repair/solicitations/ActionNotAllowed"
import { DeleteProductUseCase } from "@/domain/portal/application/use-cases/products/product/delete-product"
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
export class DeleteProductUseCaseController {
  constructor(private deleteProductUseCase: DeleteProductUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Delete("/product/:id")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Param("id") id: string,
  ) {
    const response = await this.deleteProductUseCase.execute(
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
