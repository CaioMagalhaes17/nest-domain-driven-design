import { Either, left } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { IClientProfileRepository } from "../../../repositories/profile/client/client-profile.repository"

type DeleteClientProfileResponse = Either<ProfileNotFound, void>

export class DeleteClientProfileUseCase {
  constructor(private clientProfileRepository: IClientProfileRepository) {}

  async execute(userId: string): Promise<DeleteClientProfileResponse> {
    const profile = await this.clientProfileRepository.findByParam<{
      userId: string
    }>({ userId })

    if (profile.length === 0) return left(new ProfileNotFound())

    await this.clientProfileRepository.deleteById(profile[0].id)
  }
}
