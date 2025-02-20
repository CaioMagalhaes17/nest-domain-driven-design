import { StoreSocialsDTO } from "@/domain/portal/application/dto/store-socials.dto"
import { ActionNotAllowedError } from "@/domain/portal/application/errors/repair/solicitations/ActionNotAllowed"
import { UpdateStoreSocialsUseCase } from "@/domain/portal/application/use-cases/profile/store/socials/update-store-socials"
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class UpdateStoreSocialsUseCaseController {
  constructor(private updateStoreProfileUseCase: UpdateStoreSocialsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Put("/profile/socials/:id")
  async handle(
    @Req()
    req: { user: { profileId: string } },
    @Param("id") id: string,
    @Body() createStoreSocials: Partial<StoreSocialsDTO>,
  ) {
    const response = await this.updateStoreProfileUseCase.execute(
      id,
      req.user.profileId,
      createStoreSocials,
    )

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case ActionNotAllowedError:
          throw new BadRequestException(response.value.message)
        case BadRequestException:
          throw new BadRequestException("Rede social não encontrada!")
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }
  }
}
