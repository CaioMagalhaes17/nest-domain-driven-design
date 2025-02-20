import { ActionNotAllowedError } from "@/domain/portal/application/errors/repair/solicitations/ActionNotAllowed"
import { DeleteStoreContactsUseCase } from "@/domain/portal/application/use-cases/profile/store/contacts/delete-store-contacts"
import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class DeleteStoreContactsUseCaseController {
  constructor(private deleteStoreContactUseCase: DeleteStoreContactsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Delete("/profile/contacts/:id")
  async handle(
    @Req()
    req: {
      user: { profileId: string }
    },
    @Param("id") id: string,
  ) {
    const response = await this.deleteStoreContactUseCase.execute(
      id,
      req.user.profileId,
    )

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case ActionNotAllowedError:
          throw new BadRequestException(response.value.message)
        case BadRequestException:
          throw new BadRequestException("Contato não encontrado!")
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }
  }
}
