import { Either, left, right } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { StoreProfile } from "src/domain/portal/enterprise/profile/store/store-profile"
import { IStoreProfileRepository } from "../../../repositories/profile/store/store-profile.repository"
import { FetchGeolocationUseCase } from "../../geolocation/fetch-geolocation-use-case"
import { Geolocation } from "@/domain/portal/enterprise/geolocation/geolocation"
import { GeolocationNotFound } from "../../../errors/geolocation/geolocation-not-found"
import { FetchStoreDistanceFromClientUseCase } from "../../geolocation/fetch-store-distance-from-client"
import { FetchStoreContactsUseCase } from "./contacts/fetch-store-contacts"

type FetchStoreProfileResponse = Either<
  ProfileNotFound,
  {
    profile: StoreProfile
    location?: Geolocation
    distance?: number
  }
>

export class FetchStoreProfileByIdUseCase {
  constructor(
    private storeProfileRepository: IStoreProfileRepository,
    private fetchGeoLocationUseCase: FetchGeolocationUseCase,
    private fetchDistance: FetchStoreDistanceFromClientUseCase,
    private fetchStoreContactsUseCase: FetchStoreContactsUseCase,
  ) {}

  async execute(
    id: string,
    clientProfileId: string,
  ): Promise<FetchStoreProfileResponse> {
    const profile = await this.storeProfileRepository.findById(id)
    if (!profile) return left(new ProfileNotFound())
    const storeGeoloation =
      await this.fetchGeoLocationUseCase.execute(clientProfileId)
    if (storeGeoloation.isLeft()) return left(new GeolocationNotFound())
    const geoLocation = await this.fetchGeoLocationUseCase.execute(profile.id)
    if (geoLocation.isRight()) {
      const distance = await this.fetchDistance.execute(
        storeGeoloation.value[0].latitude,
        storeGeoloation.value[0].longitude,
        storeGeoloation.value[0].radius,
        profile.id.toString(),
      )
      const contacts = await this.fetchStoreContactsUseCase.execute(profile.id)
      const geoInfos = geoLocation.value[0]
      const retorno = {
        profile: profile,
        location: geoInfos,
        distance,
        contacts,
      }
      return right(retorno)
    }
    return right({ profile })
  }
}
