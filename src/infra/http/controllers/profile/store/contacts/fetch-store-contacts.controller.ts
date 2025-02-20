import { FetchStoreContactsUseCase } from "@/domain/portal/application/use-cases/profile/store/contacts/fetch-store-contacts"
import { Controller, Get, Req, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchStoreContactsUseCaseController {
  constructor(private createStoreContactsUseCase: FetchStoreContactsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/profile/contacts")
  async handle(
    @Req()
    req: {
      user: { profileId: string }
    },
  ) {
    const response = await this.createStoreContactsUseCase.execute(
      req.user.profileId,
    )

    return response.value
  }
}
