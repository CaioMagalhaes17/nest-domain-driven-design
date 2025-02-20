import { ActionNotAllowedError } from "@/domain/portal/application/errors/repair/solicitations/ActionNotAllowed"
import { DeleteStoreSocialsUseCase } from "@/domain/portal/application/use-cases/profile/store/socials/delete-store-socials"
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
export class DeleteStoreSocialsUseCaseController {
  constructor(private deleteStoreProfileUseCase: DeleteStoreSocialsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Delete("/profile/socials/:id")
  async handle(
    @Req()
    req: {
      user: { profileId: string }
    },
    @Param("id") id: string,
  ) {
    const response = await this.deleteStoreProfileUseCase.execute(
      id,
      req.user.profileId,
    )

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case ActionNotAllowedError:
          throw new BadRequestException(response.value.message)
        case BadRequestException:
          throw new BadRequestException("Rede social não encontrada!")
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }
  }
}
