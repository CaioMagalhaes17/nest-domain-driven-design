import { SelectProfileUseCase } from "@/domain/portal/application/use-cases/profile/store/select-profile-use-case"
import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class SelectProfileUseCaseController {
  constructor(private selectProfileUseCase: SelectProfileUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/profile/store/select")
  async handle(
    @Req()
    req: {
      user: { id: string; profileId: string }
    },
  ) {
    const response = await this.selectProfileUseCase.execute({
      userId: req.user.id,
      storeProfileId: req.user.profileId,
    })

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    return { id: response.value }
  }
}
