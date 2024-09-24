import { Either, left } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { ClientProfileRepository } from "../../../repositories/profile/client/client-profile.repository"

type DeleteClientProfileResponse = Either<ProfileNotFound, void>

export class DeleteClientProfileUseCase {
  constructor(private clientProfileRepository: ClientProfileRepository) {}

  async execute(userId: number): Promise<DeleteClientProfileResponse> {
    const profile = await this.clientProfileRepository.fetchByUserId(userId)

    if (!profile) return left(new ProfileNotFound())

    await this.clientProfileRepository.deleteByUserId(userId)
  }
}
