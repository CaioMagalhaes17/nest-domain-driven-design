import { ClientProfile } from "src/domain/portal/enterprise/profile/client/client-profile"
import { ClientProfile as InfraClientProfileModel } from "../../../model/profile/client/client-profile.model"

export class ClientProfileMapper {
  static toDomain(row: InfraClientProfileModel): ClientProfile {
    return ClientProfile.create(
      {
        name: row.name,
        address: row.address,
        preferredMapRadiusId: row.fk_id_map_radius,
        profileImg: row.profile_img,
        rating: row.rating,
        userId: row.fk_id_user,
      },
      row.id,
    )
  }
}
