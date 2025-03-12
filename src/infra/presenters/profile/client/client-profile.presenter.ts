import { Geolocation } from "@/domain/portal/enterprise/geolocation/geolocation"
import { ClientProfile } from "src/domain/portal/enterprise/profile/client/client-profile"

export class ClientProfilePresenter {
  static toHttp(profile: ClientProfile, location?: Geolocation) {
    return {
      id: profile.id,
      name: profile.name,
      userId: profile.userId,
      location: {
        latitude: location?.latitude,
        longitude: location?.longitude,
        radius: location?.radius,
      },
    }
  }
}
