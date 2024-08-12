import { Either, left } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { ProfileActionNotAllowed } from "../../../errors/profile/ProfileActionNotAllowed"
import { ClientProfileRepository } from "../../../repositories/profile/client/client-profile.repository"

export type EditProfilePayload = {
  id: number
  name?: string
  address?: string
  preferredMapRadiusId?: number
  profileImg?: string
  rating?: string
}

type EditClientProfileReturn = Either<
  ProfileActionNotAllowed | ProfileNotFound,
  void
>
export class EditClientProfile {
  constructor(private clientProfileRepository: ClientProfileRepository) {}

  async execute(
    editProfilePayload: EditProfilePayload,
    userId: number,
  ): Promise<EditClientProfileReturn> {
    const profile = await this.clientProfileRepository.fetchById(
      editProfilePayload.id,
    )

    if (!profile) return left(new ProfileNotFound())

    if (profile.userId !== userId) return left(new ProfileActionNotAllowed())

    await this.clientProfileRepository.editProfile(editProfilePayload)
  }
}
