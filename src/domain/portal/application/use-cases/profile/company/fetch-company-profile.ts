import { Either, left, right } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { CompanyProfile } from "src/domain/portal/enterprise/profile/company/company-profile"

type FetchCompanyProfileResponse = Either<
  ProfileNotFound,
  {
    profile: CompanyProfile
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
