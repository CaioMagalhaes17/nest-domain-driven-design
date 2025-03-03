import { FetchStoreContactsUseCase } from "@/domain/portal/application/use-cases/profile/store/contacts/fetch-store-contacts"
import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchStoreContactsUseCaseController {
  constructor(private createStoreContactsUseCase: FetchStoreContactsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/profile/contacts/:id?")
  async handle(
    @Req()
    req: {
      user: { profileId: string }
    },
    @Param("id") id: string,
  ) {
    if (id) {
      const response = await this.createStoreContactsUseCase.execute(id)
      return response.value
    }
    const response = await this.createStoreContactsUseCase.execute(
      req.user.profileId,
    )

    return response.value
  }
}
