import { StoreProfile } from "src/domain/portal/enterprise/profile/store/store-profile"
import { StoreProfile as SequelizeStoreProfile } from "../../../model/profile/company/company-profile.model"
import { StoreProfileMapper } from "../../../mappers/profile/store/store-profile.mapper"
import { CreateStoreProfilePayload } from "src/domain/portal/application/use-cases/profile/store/create-store-profile"
import { EditStoreProfilePayload } from "src/domain/portal/application/use-cases/profile/store/edit-store-profile"

export class SequelizeStoreProfileRepository {
  async fetchById(profileId: number): Promise<StoreProfile | void> {
    const result = await SequelizeStoreProfile.findByPk(profileId)
    if (result) return StoreProfileMapper.toDomain(result)
  }

  async fetchByUserId(userId: number): Promise<StoreProfile | void> {
    const result = await SequelizeStoreProfile.findOne({
      where: { fk_id_user: userId },
    })
    if (result) return StoreProfileMapper.toDomain(result)
  }

  async deleteById(profileId: number): Promise<void> {
    await SequelizeStoreProfile.destroy({
      where: { id: profileId },
    })
  }

  async createProfile(
    createProfilePayload: CreateStoreProfilePayload,
  ): Promise<void> {
    await SequelizeStoreProfile.create({
      name: createProfilePayload.name,
      address: createProfilePayload.address,
      profile_img: createProfilePayload.profileImg,
      fk_id_user: createProfilePayload.userId,
    })
  }

  async editProfile(
    editProfilePayload: EditStoreProfilePayload,
  ): Promise<void> {
    const storeProfile = await SequelizeStoreProfile.findByPk(
      editProfilePayload.id,
    )
    storeProfile.update({
      name: editProfilePayload.name
        ? editProfilePayload.name
        : storeProfile.name,
      address: editProfilePayload.address
        ? editProfilePayload.address
        : storeProfile.address,
      profile_img: editProfilePayload.profileImg
        ? editProfilePayload.profileImg
        : storeProfile.profile_img,
      rating: editProfilePayload.rating
        ? editProfilePayload.rating
        : storeProfile.rating,
      bio: editProfilePayload.bio ? editProfilePayload.bio : storeProfile.bio,
      fk_id_type_subscription: editProfilePayload.typeSubscriptionId
        ? editProfilePayload.typeSubscriptionId
        : storeProfile.fk_id_type_subscription,
      fk_id_geo_infos: editProfilePayload.preferredMapRadiusId
        ? editProfilePayload.preferredMapRadiusId
        : storeProfile.fk_id_geo_infos,
    })
  }
}
