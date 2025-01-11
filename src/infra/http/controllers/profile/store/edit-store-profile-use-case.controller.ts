import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common"
import { ProfileNotFound } from "src/domain/portal/application/errors/profile/ProfileNotFound"
import {
  EditStoreProfilePayload,
  EditStoreProfileUseCase,
} from "src/domain/portal/application/use-cases/profile/store/edit-store-profile"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class EditStoreProfileUseCaseController {
  constructor(private editStoreProfileUseCase: EditStoreProfileUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Put("/profile/store")
  async handle(
    @Req() req: { user: { id: string; isStore: boolean } },
    @Body() editClientProfile: EditStoreProfilePayload,
  ) {
    const response = await this.editStoreProfileUseCase.execute(
      editClientProfile,
      req.user.id,
      req.user.isStore,
    )

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case ProfileNotFound:
          throw new NotFoundException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }
  }
}
