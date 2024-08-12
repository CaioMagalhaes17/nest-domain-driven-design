import { Either, left } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { ProfileActionNotAllowed } from "../../../errors/profile/ProfileActionNotAllowed"

type DeleteCompanyProfileResponse = Either<
  ProfileActionNotAllowed | ProfileNotFound,
  void
>

export class DeleteCompanyProfile {
  constructor(private companyProfileRepository) {}

  async execute(
    profileId: number,
    userId: number,
  ): Promise<DeleteCompanyProfileResponse> {
    const profile = await this.companyProfileRepository.fetchById(profileId)

    if (!profile) return left(new ProfileNotFound())
    if (profile.userId !== userId) return left(new ProfileActionNotAllowed())

    await this.companyProfileRepository.deleteById(profileId)
  }
}
