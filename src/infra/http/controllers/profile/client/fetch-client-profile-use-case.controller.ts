import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from "@nestjs/common"
import { ProfileNotFound } from "src/domain/portal/application/errors/profile/ProfileNotFound"
import { FetchClientProfileUseCase } from "src/domain/portal/application/use-cases/profile/client/fetch-client-profile-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"
import { ClientProfilePresenter } from "src/infra/presenters/profile/client/client-profile.presenter"

@Controller()
export class FetchClientProfileUseCaseController {
  constructor(private fetchClientProfileUseCase: FetchClientProfileUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/user/profile")
  async handle(@Req() req: { user: { id: number } }) {
    const response = await this.fetchClientProfileUseCase.execute(req.user.id)
    if (response.isLeft()) {
      switch (response.value.constructor) {
        case ProfileNotFound:
          throw new NotFoundException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    const { profile } = response.value

    return {
      data: ClientProfilePresenter.toHttp(profile),
    }
  }
}
