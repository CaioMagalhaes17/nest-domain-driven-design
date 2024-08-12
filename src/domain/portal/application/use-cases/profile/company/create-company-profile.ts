import { Either, left } from "src/core/Either"
import { UserAlreadyHasProfile } from "../../../errors/profile/UserAlreadyHasProfile"

export type CreateProfilePayload = {
  name: string
  userId: number
  address: string
  preferredMapRadiusId: number
  profileImg: string
}

type CreateCompanyProfileResponse = Either<UserAlreadyHasProfile, void>

export class CreateClientProfile {
  constructor(private companyProfileRepository) {}

  async execute(
    createProfilePayload: CreateProfilePayload,
  ): Promise<CreateCompanyProfileResponse> {
    const profile = await this.companyProfileRepository.fetchByUserId(
      createProfilePayload.userId,
    )

    if (profile) return left(new UserAlreadyHasProfile())

    await this.companyProfileRepository.createProfile(createProfilePayload)
  }
}
