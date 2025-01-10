import {
  BadRequestException,
  Controller,
  Delete,
  NotFoundException,
  Req,
  UseGuards,
} from "@nestjs/common"
import { ProfileNotFound } from "src/domain/portal/application/errors/profile/ProfileNotFound"
import { DeleteClientProfileUseCase } from "src/domain/portal/application/use-cases/profile/client/delete-client-profile-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class DeleteClientProfileUseCaseController {
  constructor(private deleteClientProfileUseCase: DeleteClientProfileUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Delete("/profile/client")
  async handle(@Req() req: { user: { id: string } }) {
    const response = await this.deleteClientProfileUseCase.execute(req.user.id)
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
