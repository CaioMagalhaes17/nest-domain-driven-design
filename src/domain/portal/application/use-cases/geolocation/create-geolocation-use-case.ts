import { Either, left } from "src/core/Either"
import { ClientProfileRepository } from "../../repositories/profile/client/client-profile.repository"
import { ProfileActionNotAllowed } from "../../errors/profile/ProfileActionNotAllowed"

type CreateGeolocationUseCaseResponse = Either<ProfileActionNotAllowed, number>

export class CreateGeolocationUseCase {
  constructor(
    private mapRadiusRepository,
    private clientProfileRepository: ClientProfileRepository,
  ) {}

  async execute(
    mapRadiusPayload,
    user: { id: number; isStore: boolean },
  ): Promise<CreateGeolocationUseCaseResponse> {
    if (user.isStore) return left(new ProfileActionNotAllowed())
    const id = await this.mapRadiusRepository.create(mapRadiusPayload)
    await this.clientProfileRepository.editProfile(
      { preferredMapRadiusId: id },
      user.id,
    )
    return id
  }
}
