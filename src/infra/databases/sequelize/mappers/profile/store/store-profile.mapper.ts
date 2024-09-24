import { StoreProfile } from "src/domain/portal/enterprise/profile/store/store-profile"
import { StoreProfile as SequelizeStoreProfile } from "../../../model/profile/store/store-profile.model"

export class StoreProfileMapper {
  static toDomain(row: SequelizeStoreProfile): StoreProfile {
    return StoreProfile.create(
      {
        name: row.name,
        address: row.address,
        preferredMapRadiusId: row.fk_id_geo_infos,
        profileImg: row.profile_img,
        rating: row.rating,
        bio: row.bio,
        userId: row.fk_id_user,
        typeSubscriptionId: row.fk_id_type_subscription,
      },
      row.id,
    )
  }
}
