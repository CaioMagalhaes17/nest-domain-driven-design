import { SearchStoreProfilesUseCase } from "@/domain/portal/application/use-cases/profile/store/search-store-profiles"
import { StoreProfilePresenter } from "@/infra/presenters/profile/store/store-profile.presenter"
import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class SearchStoreProfilesUseCaseController {
  constructor(private searchStoreProfilesUseCase: SearchStoreProfilesUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/profile/store/search")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Query("name") name: string,
  ) {
    const profiles = await this.searchStoreProfilesUseCase.execute(name)
    if (profiles.length === 0) return profiles
    const formatted = profiles.map((profile) => {
      return StoreProfilePresenter.toHttp(profile.profile, profile.geolocation)
    })
    return formatted
  }
}
