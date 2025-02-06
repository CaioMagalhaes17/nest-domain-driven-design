import { Either, left, right } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { ClientProfile } from "src/domain/portal/enterprise/profile/client/client-profile"
import { IClientProfileRepository } from "../../../repositories/profile/client/client-profile.repository"
import { FetchGeolocationUseCase } from "../../geolocation/fetch-geolocation-use-case"
import { Geolocation } from "@/domain/portal/enterprise/geolocation/geolocation"

type FetchClientProfileResponse = Either<
  ProfileNotFound,
  {
    profile: ClientProfile
    location?: Geolocation
  }
>

export class FetchClientProfileUseCase {
  constructor(
    private clientProfileRepository: IClientProfileRepository,
    private fetchGeoLocationUseCase: FetchGeolocationUseCase,
  ) {}

  async execute(userId: string): Promise<FetchClientProfileResponse> {
    const profile = await this.clientProfileRepository.findByParam<{
      userId: string
    }>({ userId })
    if (profile.length === 0) return left(new ProfileNotFound())

    const geoLocation = await this.fetchGeoLocationUseCase.execute(
      profile[0].id,
    )

    if (geoLocation.isRight()) {
      const geoInfos = geoLocation.value[0]
      const retorno = {
        profile: profile[0],
        location: geoInfos,
      }
      return right(retorno)
    }
    return right({ profile: profile[0] })
  }
}
