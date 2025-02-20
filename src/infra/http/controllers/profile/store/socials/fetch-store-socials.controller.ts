import { FetchStoreSocialsUseCase } from "@/domain/portal/application/use-cases/profile/store/socials/fetch-store-socials"
import { Controller, Get, Req, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchStoreSocialsUseCaseController {
  constructor(private createStoreProfileUseCase: FetchStoreSocialsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/profile/socials")
  async handle(
    @Req()
    req: {
      user: { profileId: string }
    },
  ) {
    const response = await this.createStoreProfileUseCase.execute(
      req.user.profileId,
    )

    return response.value
  }
}
