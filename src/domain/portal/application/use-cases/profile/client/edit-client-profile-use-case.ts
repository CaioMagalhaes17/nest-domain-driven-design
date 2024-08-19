import { Either, left } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { ClientProfileRepository } from "../../../repositories/profile/client/client-profile.repository"

export type EditProfilePayload = {
  name?: string
  address?: string
  preferredMapRadiusId?: number
  profileImg?: string
  rating?: string
}

type EditClientProfileReturn = Either<ProfileNotFound, void>
export class EditClientProfileUseCase {
  constructor(private clientProfileRepository: ClientProfileRepository) {}

  async execute(
    editProfilePayload: EditProfilePayload,
    userId: number,
  ): Promise<EditClientProfileReturn> {
    const profile = await this.clientProfileRepository.fetchByUserId(userId)

    if (!profile) return left(new ProfileNotFound())

    await this.clientProfileRepository.editProfile(editProfilePayload, userId)
  }
}
