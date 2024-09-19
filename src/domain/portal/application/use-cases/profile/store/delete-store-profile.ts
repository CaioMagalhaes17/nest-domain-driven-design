import { Either, left } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { ProfileActionNotAllowed } from "../../../errors/profile/ProfileActionNotAllowed"
import { StoreProfileRepository } from "../../../repositories/profile/store/store-profile.repository"

type DeleteStoreProfileResponse = Either<
  ProfileActionNotAllowed | ProfileNotFound,
  void
>

export class DeleteStorreProfileUseCase {
  constructor(private storeProfileRepository: StoreProfileRepository) {}

  async execute(
    userId: number,
    isStore: boolean,
  ): Promise<DeleteStoreProfileResponse> {
    if (!isStore) return left(new ProfileActionNotAllowed())
    const profile = await this.storeProfileRepository.fetchByUserId(userId)

    if (!profile) return left(new ProfileNotFound())
    if (profile.userId !== userId) return left(new ProfileActionNotAllowed())

    await this.storeProfileRepository.deleteProfileById(userId)
  }
}
