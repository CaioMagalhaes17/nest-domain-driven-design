import { StoreProfileDTO } from "@/domain/portal/application/dto/budget/http/store-profile"
import { MaxProfilesExceed } from "@/domain/portal/application/errors/profile/MaxProfilesExceed"
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import { ProfileActionNotAllowed } from "src/domain/portal/application/errors/profile/ProfileActionNotAllowed"
import { CreateStoreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/create-store-profile"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class CreateStoreProfileUseCaseController {
  constructor(private createStoreProfileUseCase: CreateStoreProfileUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/profile/store")
  async handle(
    @Req()
    req: { user: { id: string; isStore: boolean; subscriptionPlanId: string } },
    @Body() createClientProfile: StoreProfileDTO,
  ) {
    const response = await this.createStoreProfileUseCase.execute(
      {
        userId: req.user.id,
        ...createClientProfile,
      },
      req.user.isStore,
      req.user.subscriptionPlanId,
    )

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case MaxProfilesExceed:
          throw new BadRequestException(response.value.message)
        case ProfileActionNotAllowed:
          throw new BadRequestException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    return { id: response.value }
  }
}
