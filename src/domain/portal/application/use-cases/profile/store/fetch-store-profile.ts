import { Either, left, right } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { StoreProfile } from "src/domain/portal/enterprise/profile/store/store-profile"

type FetchCompanyProfileResponse = Either<
  ProfileNotFound,
  {
    profile: StoreProfile
  }
>

export class FetchCompanyProfile {
  constructor(private companyProfileRepository) {}

  async execute(userId: number): Promise<FetchCompanyProfileResponse> {
    const profile = await this.companyProfileRepository.fetchByUserId(userId)

    if (!profile) return left(new ProfileNotFound())

    return right({ profile })
  }
}
