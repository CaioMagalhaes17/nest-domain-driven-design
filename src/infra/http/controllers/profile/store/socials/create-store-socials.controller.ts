import { StoreSocialsDTO } from "@/domain/portal/application/dto/store-socials.dto"
import { CreateStoreSocialsUseCase } from "@/domain/portal/application/use-cases/profile/store/socials/create-store-socials"
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class CreateStoreSocialsUseCaseController {
  constructor(private createStoreProfileUseCase: CreateStoreSocialsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/profile/socials")
  async handle(
    @Req()
    req: { user: { profileId: string } },
    @Body() createStoreSocials: StoreSocialsDTO,
  ) {
    const response = await this.createStoreProfileUseCase.execute(
      req.user.profileId,
      createStoreSocials,
    )

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case BadRequestException:
          throw new BadRequestException(
            "Você já possuí essa rede social cadastrada",
          )
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }
  }
}
