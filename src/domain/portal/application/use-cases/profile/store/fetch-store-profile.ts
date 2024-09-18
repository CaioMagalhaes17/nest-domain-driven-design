import { Either, left, right } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { StoreProfile } from "src/domain/portal/enterprise/profile/store/store-profile"

type FetchStoreProfileResponse = Either<
  ProfileNotFound,
  {
    profile: StoreProfile
  }
>

export class FetchStoreProfileUseCase {
  constructor(private storeProfileRepository) {}

  async execute(userId: number): Promise<FetchStoreProfileResponse> {
    const profile = await this.storeProfileRepository.fetchByUserId(userId)

    if (!profile) return left(new ProfileNotFound())

    return right({ profile })
  }
}
