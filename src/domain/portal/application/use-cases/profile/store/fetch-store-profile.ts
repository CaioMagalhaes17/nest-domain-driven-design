import { Either, left, right } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { StoreProfile } from "src/domain/portal/enterprise/profile/store/store-profile"
import { ProfileActionNotAllowed } from "../../../errors/profile/ProfileActionNotAllowed"
import { IStoreProfileRepository } from "../../../repositories/profile/store/store-profile.repository"

type FetchStoreProfileResponse = Either<
  ProfileNotFound,
  {
    profile: StoreProfile
  }
>

export class FetchStoreProfileUseCase {
  constructor(private storeProfileRepository: IStoreProfileRepository) {}

  async execute(profileId: string): Promise<FetchStoreProfileResponse> {
    const profile = await this.storeProfileRepository.findById(profileId)
    if (!profile) return left(new ProfileNotFound())

    return right({ profile: profile })
  }
}
