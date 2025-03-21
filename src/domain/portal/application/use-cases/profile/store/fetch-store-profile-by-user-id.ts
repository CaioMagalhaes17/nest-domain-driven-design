import { Either, left, right } from "src/core/Either"
import { ProfileNotFound } from "../../../errors/profile/ProfileNotFound"
import { StoreProfile } from "src/domain/portal/enterprise/profile/store/store-profile"
import { IStoreProfileRepository } from "../../../repositories/profile/store/store-profile.repository"
import { FetchGeolocationUseCase } from "../../geolocation/fetch-geolocation-use-case"
import { Geolocation } from "@/domain/portal/enterprise/geolocation/geolocation"
import { FetchStoreContactsUseCase } from "./contacts/fetch-store-contacts"
import { StoreContacts } from "@/domain/portal/enterprise/profile/store/store-contacts"

type FetchStoreProfileResponse = Either<
  ProfileNotFound,
  {
    profile: StoreProfile
    location?: Geolocation
    contacts?: StoreContacts
  }
>

export class FetchStoreProfileByUserIdUseCase {
  constructor(
    private storeProfileRepository: IStoreProfileRepository,
    private fetchGeoLocationUseCase: FetchGeolocationUseCase,
    private fetchStoreContactsUseCase: FetchStoreContactsUseCase,
  ) {}

  async execute(userId: string): Promise<FetchStoreProfileResponse> {
    const profile = await this.storeProfileRepository.findByParam<{
      userId: string
    }>({ userId })

    if (profile.length === 0) return left(new ProfileNotFound())

    const geoLocation = await this.fetchGeoLocationUseCase.execute(
      profile[0].id,
    )
    const contacts = await this.fetchStoreContactsUseCase.execute(profile[0].id)
    if (geoLocation.isRight()) {
      const geoInfos = geoLocation.value[0]
      const retorno = {
        profile: profile[0],
        location: geoInfos,
        contacts: contacts,
      }

      return right(retorno)
    }
    return right({ profile: profile[0] })
  }
}
