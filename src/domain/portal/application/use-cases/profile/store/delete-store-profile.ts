import { Either, left } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { ProfileActionNotAllowed } from "../../../errors/profile/ProfileActionNotAllowed"
import { IStoreProfileRepository } from "../../../repositories/profile/store/store-profile.repository"

type DeleteStoreProfileResponse = Either<
  ProfileActionNotAllowed | ProfileNotFound,
  void
>

export class DeleteStorreProfileUseCase {
  constructor(private storeProfileRepository: IStoreProfileRepository) {}

  async execute(
    userId: string,
    isStore: boolean,
  ): Promise<DeleteStoreProfileResponse> {
    if (!isStore) return left(new ProfileActionNotAllowed())
    const profile = await this.storeProfileRepository.findByParam<{
      userId: string
    }>({ userId })

    if (profile.length === 0) return left(new ProfileNotFound())

    await this.storeProfileRepository.deleteById(profile[0].id)
  }
}
