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
      telNum: profile.telNum,
      address: profile.address,
      rating: profile.rating,
      description: profile.description,
      location: {
        latitude: location?.latitude,
        longitude: location?.longitude,
      },
    }
  }
}
