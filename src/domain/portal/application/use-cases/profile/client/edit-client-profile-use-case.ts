import { Either, left } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { IClientProfileRepository } from "../../../repositories/profile/client/client-profile.repository"

export type EditProfilePayload = {
  name?: string
  profileImg?: string
  email?: string
  telNumber?: string
  rating?: string
}

type EditClientProfileReturn = Either<ProfileNotFound, void>
export class EditClientProfileUseCase {
  constructor(private clientProfileRepository: IClientProfileRepository) {}

  async execute(
    editProfilePayload: EditProfilePayload,
    userId: string,
  ): Promise<EditClientProfileReturn> {
    const profile = await this.clientProfileRepository.findByParam<{
      userId: string
    }>({ userId })
    if (!profile[0] || profile.length === 0) return left(new ProfileNotFound())

    await this.clientProfileRepository.updateById(
      profile[0].id,
      editProfilePayload,
    )
  }
}
