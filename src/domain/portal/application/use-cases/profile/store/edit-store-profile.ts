import { Either, left } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { ProfileActionNotAllowed } from "../../../errors/profile/ProfileActionNotAllowed"
import { IStoreProfileRepository } from "../../../repositories/profile/store/store-profile.repository"

export type EditStoreProfilePayload = {
  name?: string
  address?: string
  profileImg?: string
  rating?: number
  description?: string
  telNum?: string
  email?: string
}

type EditStoreProfileReturn = Either<
  ProfileActionNotAllowed | ProfileNotFound,
  void
>
export class EditStoreProfileUseCase {
  constructor(private storeProfileRepository: IStoreProfileRepository) {}

  async execute(
    editProfilePayload: EditStoreProfilePayload,
    userId: string,
    isStore: boolean,
  ): Promise<EditStoreProfileReturn> {
    if (!isStore) return left(new ProfileActionNotAllowed())
    const profile = await this.storeProfileRepository.findByParam<{
      userId: string
    }>({ userId })
    if (!profile) return left(new ProfileNotFound())

    await this.storeProfileRepository.updateById(
      profile[0].id,
      editProfilePayload,
    )
  }
}
