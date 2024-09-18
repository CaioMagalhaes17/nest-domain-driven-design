import { Either, left } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { ProfileActionNotAllowed } from "../../../errors/profile/ProfileActionNotAllowed"

type DeleteStoreProfileResponse = Either<
  ProfileActionNotAllowed | ProfileNotFound,
  void
>

export class DeleteStorreProfileUseCase {
  constructor(private storeProfileRepository) {}

  async execute(
    profileId: number,
    userId: number,
  ): Promise<DeleteStoreProfileResponse> {
    const profile = await this.storeProfileRepository.fetchById(profileId)

    if (!profile) return left(new ProfileNotFound())
    if (profile.userId !== userId) return left(new ProfileActionNotAllowed())

    await this.storeProfileRepository.deleteById(profileId)
  }
}
