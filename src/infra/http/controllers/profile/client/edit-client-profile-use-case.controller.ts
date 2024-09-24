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
  EditClientProfileUseCase,
  EditProfilePayload,
} from "src/domain/portal/application/use-cases/profile/client/edit-client-profile-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class EditClientProfileUseCaseController {
  constructor(private editClientProfileUseCase: EditClientProfileUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Put("/user/profile")
  async handle(
    @Req() req: { user: { id: number } },
    @Body() editClientProfile: EditProfilePayload,
  ) {
    const response = await this.editClientProfileUseCase.execute(
      editClientProfile,
      req.user.id,
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
