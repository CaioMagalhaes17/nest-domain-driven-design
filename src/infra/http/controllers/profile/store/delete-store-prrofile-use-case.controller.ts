import {
  BadRequestException,
  Controller,
  Delete,
  NotFoundException,
  Req,
  UseGuards,
} from "@nestjs/common"
import { ProfileActionNotAllowed } from "src/domain/portal/application/errors/profile/ProfileActionNotAllowed"
import { ProfileNotFound } from "src/domain/portal/application/errors/profile/ProfileNotFound"
import { DeleteStorreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/delete-store-profile"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class DeleteStoreProfileUseCaseController {
  constructor(private deleteStoreProfileUseCase: DeleteStorreProfileUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Delete("/user/store/profile")
  async handle(@Req() req: { user: { id: number; isStore: boolean } }) {
    const response = await this.deleteStoreProfileUseCase.execute(
      req.user.id,
      req.user.isStore,
    )
    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case ProfileNotFound:
          throw new NotFoundException(response.value.message)
        case ProfileActionNotAllowed:
          throw new NotFoundException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }
  }
}
