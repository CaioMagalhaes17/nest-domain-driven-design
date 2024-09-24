import { Either, left } from "src/core/Either"
import { UserAlreadyHasProfile } from "../../../errors/profile/UserAlreadyHasProfile"
import { ClientProfileRepository } from "../../../repositories/profile/client/client-profile.repository"

export type CreateProfilePayload = {
  name: string
  userId: number
  address?: string
  preferredMapRadiusId?: number
  profileImg?: string
}

type CreateClientProfileResponse = Either<UserAlreadyHasProfile, void>

export class CreateClientProfileUseCase {
  constructor(private clientProfileRepository: ClientProfileRepository) {}

  async execute(
    createProfilePayload: CreateProfilePayload,
  ): Promise<CreateClientProfileResponse> {
    const profile = await this.clientProfileRepository.fetchByUserId(
      createProfilePayload.userId,
    )

    if (profile) return left(new UserAlreadyHasProfile())

    await this.clientProfileRepository.createProfile(createProfilePayload)
  }
}
