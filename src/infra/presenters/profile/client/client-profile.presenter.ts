import { ClientProfile } from "src/domain/portal/enterprise/profile/client/client-profile"

export class ClientProfilePresenter {
  static toHttp(profile: ClientProfile) {
    return {
      id: profile.id,
      name: profile.name,
      rating: profile.rating,
      userId: profile.userId,
    }
  }
}
