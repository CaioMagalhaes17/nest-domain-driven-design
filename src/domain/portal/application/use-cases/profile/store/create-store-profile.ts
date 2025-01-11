import { Either, left, right } from "src/core/Either"
import { UserAlreadyHasProfile } from "../../../errors/profile/UserAlreadyHasProfile"
import { IStoreProfileRepository } from "../../../repositories/profile/store/store-profile.repository"
import { ProfileActionNotAllowed } from "../../../errors/profile/ProfileActionNotAllowed"

export type CreateStoreProfilePayload = {
  name: string
  userId: string
  address: string
  profileImg?: string
  telNum: string
  email: string
}

type CreateStoreProfileResponse = Either<
  UserAlreadyHasProfile | ProfileActionNotAllowed,
  string
>

export class CreateStoreProfileUseCase {
  constructor(private storeProfileRepository: IStoreProfileRepository) {}

  async execute(
    createProfilePayload: CreateStoreProfilePayload,
    isStore: boolean,
  ): Promise<CreateStoreProfileResponse> {
    if (!isStore) return left(new ProfileActionNotAllowed())
    const profile = await this.storeProfileRepository.findByParam<{
      userId: string
    }>({ userId: createProfilePayload.userId })

    if (profile.length > 0) return left(new UserAlreadyHasProfile())

    const newProfile =
      await this.storeProfileRepository.create(createProfilePayload)
    return right(newProfile.id)
  }
}
