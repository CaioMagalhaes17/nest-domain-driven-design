import { Geolocation } from "@/domain/portal/enterprise/geolocation/geolocation"
import { StoreProfile } from "@/domain/portal/enterprise/profile/store/store-profile"

export class StoreProfilePresenter {
  static toHttp(profile: StoreProfile, location?: Geolocation) {
    return {
      id: profile.id,
      userId: profile.userId,
      name: profile.name,
      profileImg: profile.profileImg,
      email: profile.email,
      telNum: profile.telNumber,
      address: profile.address,
      description: profile.description,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    }
  }
}
