import { Either, left, right } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { StoreProfile } from "src/domain/portal/enterprise/profile/store/store-profile"
import { IStoreProfileRepository } from "../../../repositories/profile/store/store-profile.repository"
import { FetchGeolocationUseCase } from "../../geolocation/fetch-geolocation-use-case"
import { Geolocation } from "@/domain/portal/enterprise/geolocation/geolocation"

type FetchStoreProfileResponse = Either<
  ProfileNotFound,
  {
    profile: StoreProfile
    location?: Geolocation
  }
>

export class FetchStoreProfileUseCase {
  constructor(
    private storeProfileRepository: IStoreProfileRepository,
    private fetchGeoLocationUseCase: FetchGeolocationUseCase,
  ) {}

  async execute(profileId: string): Promise<FetchStoreProfileResponse> {
    const profile = await this.storeProfileRepository.findById(profileId)
    if (!profile) return left(new ProfileNotFound())

    const geoLocation = await this.fetchGeoLocationUseCase.execute(profile.id)
    if (geoLocation.isRight()) {
      const geoInfos = geoLocation.value[0]
      const retorno = {
        profile: profile,
        location: geoInfos,
      }
      return right(retorno)
    }
    return right({ profile })
  }
}
