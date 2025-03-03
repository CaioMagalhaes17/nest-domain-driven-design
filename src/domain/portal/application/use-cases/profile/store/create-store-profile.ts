import { Either, left, right } from "src/core/Either"
import { IStoreProfileRepository } from "../../../repositories/profile/store/store-profile.repository"
import { ProfileActionNotAllowed } from "../../../errors/profile/ProfileActionNotAllowed"
import { MaxProfilesExceed } from "../../../errors/profile/MaxProfilesExceed"
import { PlanValidationQuantityProfilesFactory } from "../../../factories/plans/profiles/plan-validation-factory"

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

    const factory =
      PlanValidationQuantityProfilesFactory.create(subscriptionPlanId)

    const validationResult = factory.validate(profile.length)
    if (validationResult.isLeft()) return left(validationResult.value)

    const newProfile =
      await this.storeProfileRepository.create(createProfilePayload)
    return right(newProfile.id)
  }
}
