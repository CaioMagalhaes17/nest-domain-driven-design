import { Either, left, right } from "src/core/Either"
import { IStoreProfileRepository } from "../../../repositories/profile/store/store-profile.repository"
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

type CreateStoreProfileResponse = Either<MaxProfilesExceed, string>

export class CreateStoreProfileUseCase {
  constructor(private storeProfileRepository: IStoreProfileRepository) {}

  async execute(
    createProfilePayload: CreateStoreProfilePayload,
    subscriptionPlanId: string,
  ): Promise<CreateStoreProfileResponse> {
    const profile = await this.storeProfileRepository.findByParam<{
      userId: string
    }>({ userId: createProfilePayload.userId })
    console.log("whats?", subscriptionPlanId)
    const factory =
      PlanValidationQuantityProfilesFactory.create(subscriptionPlanId)
    console.log("ec?")
    const validationResult = factory.validate(profile.length)
    if (validationResult.isLeft()) return left(validationResult.value)

    const newProfile =
      await this.storeProfileRepository.create(createProfilePayload)
    return right(newProfile.id)
  }
}
