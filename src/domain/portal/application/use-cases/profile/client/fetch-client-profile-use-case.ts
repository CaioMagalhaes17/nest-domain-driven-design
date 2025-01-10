import { Either, left, right } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { ClientProfile } from "src/domain/portal/enterprise/profile/client/client-profile"
import { IClientProfileRepository } from "../../../repositories/profile/client/client-profile.repository"

type FetchClientProfileResponse = Either<
  ProfileNotFound,
  {
    profile: ClientProfile
  }
>

export class FetchClientProfileUseCase {
  constructor(private clientProfileRepository: IClientProfileRepository) {}

  async execute(userId: string): Promise<FetchClientProfileResponse> {
    const profile = await this.clientProfileRepository.findByParam<{
      userId: string
    }>({ userId })
    if (profile.length === 0) return left(new ProfileNotFound())

    return right({ profile: profile[0] })
  }
}
