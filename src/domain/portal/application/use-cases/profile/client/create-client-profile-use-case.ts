import { Either, left, right } from "src/core/Either"
import { UserAlreadyHasProfile } from "../../../errors/profile/UserAlreadyHasProfile"
import { IClientProfileRepository } from "../../../repositories/profile/client/client-profile.repository"

export type CreateProfilePayload = {
  name: string
  userId: string
  profileImg?: string
  email?: string
  telNumber?: string
}

type CreateClientProfileResponse = Either<UserAlreadyHasProfile, string>

export class CreateClientProfileUseCase {
  constructor(private clientProfileRepository: IClientProfileRepository) {}

  async execute(
    createProfilePayload: CreateProfilePayload,
  ): Promise<CreateClientProfileResponse> {
    const profile = await this.clientProfileRepository.findByParam<{
      userId: string
    }>({ userId: createProfilePayload.userId })

    if (profile && profile.length > 0) return left(new UserAlreadyHasProfile())

    const newProfile =
      await this.clientProfileRepository.create(createProfilePayload)
    return right(newProfile.id)
  }
}
