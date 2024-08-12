import { Either, left, right } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { ClientProfile } from "src/domain/portal/enterprise/profile/client/client-profile"
import { ClientProfileRepository } from "../../../repositories/profile/client/client-profile.repository"

type FetchClientProfileResponse = Either<
  ProfileNotFound,
  {
    profile: ClientProfile
  }
>

export class FetchClientProfile {
  constructor(private clientProfileRepository: ClientProfileRepository) {}

  async execute(userId: number): Promise<FetchClientProfileResponse> {
    const profile = await this.clientProfileRepository.fetchByUserId(userId)

    if (!profile) return left(new ProfileNotFound())

    return right({ profile })
  }
}
