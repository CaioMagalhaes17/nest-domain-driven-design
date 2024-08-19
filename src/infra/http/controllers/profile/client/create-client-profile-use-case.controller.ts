import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import { UserAlreadyHasProfile } from "src/domain/portal/application/errors/profile/UserAlreadyHasProfile"
import { CreateClientProfileUseCase } from "src/domain/portal/application/use-cases/profile/client/create-client-profile-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

type CreateClientProfileHttp = {
  name: string
  address?: string
  preferredMapRadiusId?: number
  profileImg?: string
}

@Controller()
export class CreateClientProfileUseCaseController {
  constructor(private createClientProfileUseCase: CreateClientProfileUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/user/profile")
  async handle(
    @Req() req: { user: { id: number } },
    @Body() createClientProfile: CreateClientProfileHttp,
  ) {
    const response = await this.createClientProfileUseCase.execute({
      userId: req.user.id,
      ...createClientProfile,
    })

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case UserAlreadyHasProfile:
          throw new BadRequestException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }
  }
}
