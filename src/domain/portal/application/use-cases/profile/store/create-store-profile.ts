import { Either, left, right } from "src/core/Either"
import { IStoreProfileRepository } from "../../../repositories/profile/store/store-profile.repository"
import { ProfileActionNotAllowed } from "../../../errors/profile/ProfileActionNotAllowed"
import {
  SUBCRIPTION_PLAN_LEVEL_1,
  SUBCRIPTION_PLAN_LEVEL_2,
} from "../../../constants/subscription-plans"
import { MaxProfilesExceed } from "../../../errors/profile/MaxProfilesExceed"

export type CreateStoreProfilePayload = {
  name: string
  userId: string
  address: string
  profileImg?: string
  telNum: string
  email: string
}

type CreateStoreProfileResponse = Either<
  MaxProfilesExceed | ProfileActionNotAllowed,
  string
>

export class CreateStoreProfileUseCase {
  constructor(private storeProfileRepository: IStoreProfileRepository) {}

  async execute(
    createProfilePayload: CreateStoreProfilePayload,
    isStore: boolean,
    subscriptionPlanId: string,
  ): Promise<CreateStoreProfileResponse> {
    if (!isStore) return left(new ProfileActionNotAllowed())
    const profile = await this.storeProfileRepository.findByParam<{
      userId: string
    }>({ userId: createProfilePayload.userId })

    if (profile.length > 0 && subscriptionPlanId === SUBCRIPTION_PLAN_LEVEL_1)
      return left(new MaxProfilesExceed())

    if (profile.length > 2 && subscriptionPlanId === SUBCRIPTION_PLAN_LEVEL_2)
      return left(new MaxProfilesExceed())

    const newProfile =
      await this.storeProfileRepository.create(createProfilePayload)
    return right(newProfile.id)
  }
}
