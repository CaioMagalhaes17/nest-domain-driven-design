import { StoreProfilePresenter } from "@/infra/presenters/profile/store/store-profile.presenter"
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from "@nestjs/common"
import { ProfileActionNotAllowed } from "src/domain/portal/application/errors/profile/ProfileActionNotAllowed"
import { ProfileNotFound } from "src/domain/portal/application/errors/profile/ProfileNotFound"
import { FetchStoreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/fetch-store-profile"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchStoreProfileUseCaseController {
  constructor(private fetchStoreProfileUseCase: FetchStoreProfileUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/profile/store")
  async handle(
    @Req() req: { user: { profileId: string; subscriptionPlanId: number } },
  ) {
    const response = await this.fetchStoreProfileUseCase.execute(
      req.user.profileId,
    )

    if (response.isLeft()) {
      switch (response.value.constructor) {
        case ProfileNotFound:
          throw new NotFoundException(response.value.message)
        case ProfileActionNotAllowed:
          throw new NotFoundException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    return StoreProfilePresenter.toHttp(
      response.value.profile,
      response.value.location,
      req.user.subscriptionPlanId,
    )
  }
}
