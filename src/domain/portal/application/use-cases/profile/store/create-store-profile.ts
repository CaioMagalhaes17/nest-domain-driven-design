import { Either, left } from "src/core/Either"
import { UserAlreadyHasProfile } from "../../../errors/profile/UserAlreadyHasProfile"
import { StoreProfileRepository } from "../../../repositories/profile/store/store-profile.repository"
import { ProfileActionNotAllowed } from "../../../errors/profile/ProfileActionNotAllowed"

export type CreateStoreProfilePayload = {
  name: string
  userId: number
  address: string
  profileImg?: string
}

type CreateStoreProfileResponse = Either<
  UserAlreadyHasProfile | ProfileActionNotAllowed,
  void
>

export class CreateStoreProfileUseCase {
  constructor(private storeProfileRepository: StoreProfileRepository) {}

  async execute(
    createProfilePayload: CreateStoreProfilePayload,
    isStore: boolean,
  ): Promise<CreateStoreProfileResponse> {
    if (!isStore) return left(new ProfileActionNotAllowed())
    const profile = await this.storeProfileRepository.fetchByUserId(
      createProfilePayload.userId,
    )

    if (profile) return left(new UserAlreadyHasProfile())

    await this.storeProfileRepository.createProfile(createProfilePayload)
  }
}
