import { Either, left, right } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { StoreProfile } from "src/domain/portal/enterprise/profile/store/store-profile"
import { ProfileActionNotAllowed } from "../../../errors/profile/ProfileActionNotAllowed"

type FetchStoreProfileResponse = Either<
  ProfileNotFound,
  {
    profile: StoreProfile
  }
>

export class FetchStoreProfileUseCase {
  constructor(private storeProfileRepository) {}

  async execute(
    userId: number,
    isStore: boolean,
  ): Promise<FetchStoreProfileResponse> {
    if (!isStore) return left(new ProfileActionNotAllowed())
    const profile = await this.storeProfileRepository.fetchByUserId(userId)

    if (!profile) return left(new ProfileNotFound())

    return right({ profile })
  }
}
