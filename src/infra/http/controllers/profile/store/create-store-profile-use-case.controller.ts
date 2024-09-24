import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import { ProfileActionNotAllowed } from "src/domain/portal/application/errors/profile/ProfileActionNotAllowed"
import { UserAlreadyHasProfile } from "src/domain/portal/application/errors/profile/UserAlreadyHasProfile"
import { CreateStoreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/create-store-profile"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

type CreateStoreProfileHttp = {
  name: string
  address: string
  profileImg?: string
}

@Controller()
export class CreateStoreProfileUseCaseController {
  constructor(private createStoreProfileUseCase: CreateStoreProfileUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/user/store/profile")
  async handle(
    @Req() req: { user: { id: number; isStore: boolean } },
    @Body() createClientProfile: CreateStoreProfileHttp,
  ) {
    const response = await this.createStoreProfileUseCase.execute(
      {
        userId: req.user.id,
        ...createClientProfile,
      },
      req.user.isStore,
    )

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case UserAlreadyHasProfile:
          throw new BadRequestException(response.value.message)
        case ProfileActionNotAllowed:
          throw new BadRequestException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }
  }
}
