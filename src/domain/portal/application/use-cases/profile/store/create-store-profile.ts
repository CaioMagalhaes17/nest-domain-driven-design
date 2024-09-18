import { Either, left } from "src/core/Either"
import { UserAlreadyHasProfile } from "../../../errors/profile/UserAlreadyHasProfile"
import { CompanyProfileRepository } from "../../../repositories/profile/company/company-profile.repository"

export type CreateStoreProfilePayload = {
  name: string
  userId: number
  address: string
  profileImg?: string
}

type CreateStoreProfileResponse = Either<UserAlreadyHasProfile, void>

export class CreateClientProfile {
  constructor(private companyProfileRepository: CompanyProfileRepository) {}

  async execute(
    createProfilePayload: CreateStoreProfilePayload,
  ): Promise<CreateStoreProfileResponse> {
    const profile = await this.companyProfileRepository.fetchByUserId(
      createProfilePayload.userId,
    )

    if (profile) return left(new UserAlreadyHasProfile())

    await this.companyProfileRepository.createProfile(createProfilePayload)
  }
}
