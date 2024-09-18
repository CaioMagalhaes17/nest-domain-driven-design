import { Either, left } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { ProfileActionNotAllowed } from "../../../errors/profile/ProfileActionNotAllowed"

export type EditStoreProfilePayload = {
  id: number
  name?: string
  address?: string
  preferredMapRadiusId?: number
  profileImg?: string
  rating?: number
  bio?: string
  typeSubscriptionId?: number
}

type EditStoreProfileReturn = Either<
  ProfileActionNotAllowed | ProfileNotFound,
  void
>
export class EditStoreProfileUseCase {
  constructor(private storeProfileRepository) {}

  async execute(
    editProfilePayload: EditStoreProfilePayload,
    userId: number,
  ): Promise<EditStoreProfileReturn> {
    const profile = await this.storeProfileRepository.fetchById(
      editProfilePayload.id,
    )

    if (!profile) return left(new ProfileNotFound())

    if (profile.userId !== userId) return left(new ProfileActionNotAllowed())

    await this.storeProfileRepository.editProfile(editProfilePayload)
  }
}
