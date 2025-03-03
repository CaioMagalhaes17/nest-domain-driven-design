import { FetchStoreSocialsUseCase } from "@/domain/portal/application/use-cases/profile/store/socials/fetch-store-socials"
import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchStoreSocialsUseCaseController {
  constructor(private createStoreProfileUseCase: FetchStoreSocialsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/profile/socials/:id?")
  async handle(
    @Req()
    req: {
      user: { profileId: string }
    },
    @Param("id") id?: string,
  ) {
    if (id) {
      const response = await this.createStoreProfileUseCase.execute(id)

      return response.value
    }
    const response = await this.createStoreProfileUseCase.execute(
      req.user.profileId,
    )

    return response.value
  }
}
