import { Geolocation } from "@/domain/portal/enterprise/geolocation/geolocation"
import { StoreProfile } from "@/domain/portal/enterprise/profile/store/store-profile"

export class StoreProfilePresenter {
  static toHttp(
    profile: StoreProfile,
    location?: Geolocation,
    subscriptionPlanId?: number,
  ) {
    return {
      id: profile.id,
      userId: profile.userId,
      name: profile.name,
      profileImg: profile.profileImg,
      address: profile.address,
      rating: profile.rating,
      tags: profile.tags,
      workingTime: profile.workingTime,
      description: profile.description,
      subscriptionPlanId,
      location: {
        latitude: location?.latitude,
        longitude: location?.longitude,
      },
    }
  }
}
