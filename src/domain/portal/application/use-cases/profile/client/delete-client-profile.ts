import { Either, left } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { ProfileActionNotAllowed } from "../../../errors/profile/ProfileActionNotAllowed"
import { ClientProfileRepository } from "../../../repositories/profile/client/client-profile.repository"

type DeleteClientProfileResponse = Either<
  ProfileActionNotAllowed | ProfileNotFound,
  void
>

export class DeleteClientProfile {
  constructor(private clientProfileRepository: ClientProfileRepository) {}

  async execute(
    profileId: number,
    userId: number,
  ): Promise<DeleteClientProfileResponse> {
    const profile = await this.clientProfileRepository.fetchById(profileId)

    if (!profile) return left(new ProfileNotFound())
    if (profile.userId !== userId) return left(new ProfileActionNotAllowed())

    await this.clientProfileRepository.deleteById(profileId)
  }
}
