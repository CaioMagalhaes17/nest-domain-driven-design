import { ClientProfileRepository } from "src/domain/portal/application/repositories/profile/client/client-profile.repository"
import { CreateProfilePayload } from "src/domain/portal/application/use-cases/profile/client/create-client-profile-use-case"
import { EditProfilePayload } from "src/domain/portal/application/use-cases/profile/client/edit-client-profile-use-case"
import { ClientProfile } from "src/domain/portal/enterprise/profile/client/client-profile"
import { ClientProfile as SequelizeClientProfileModel } from "../../../model/profile/client/client-profile.model"
import { ClientProfileMapper } from "../../../mappers/profile/client/client-profile.mapper"

export class SequelizeClientProfileRepository extends ClientProfileRepository {
  async fetchById(profileId: number): Promise<ClientProfile | void> {
    const result = await SequelizeClientProfileModel.findByPk(profileId)
    if (result) return ClientProfileMapper.toDomain(result)
  }

  async fetchByUserId(userId: number): Promise<ClientProfile | void> {
    const result = await SequelizeClientProfileModel.findOne({
      where: { fk_id_user: userId },
    })
    if (result) return ClientProfileMapper.toDomain(result)
  }

  async deleteById(profileId: number): Promise<void> {
    await SequelizeClientProfileModel.destroy({
      where: { id: profileId },
    })
  }

  async createProfile(
    createProfilePayload: CreateProfilePayload,
  ): Promise<void> {
    await SequelizeClientProfileModel.create({
      name: createProfilePayload.name,
      fk_id_user: createProfilePayload.userId,
      address: createProfilePayload?.address,
      fk_id_map_radius: createProfilePayload?.preferredMapRadiusId,
      profile_img: createProfilePayload?.profileImg,
    })
  }

  async editProfile(editProfilePayload: EditProfilePayload): Promise<void> {
    await SequelizeClientProfileModel.update(
      {
        name: editProfilePayload.name,
        address: editProfilePayload.address,
        fk_id_map_radius: editProfilePayload.preferredMapRadiusId,
        profile_img: editProfilePayload.profileImg,
        rating: editProfilePayload.rating,
      },
      {
        where: { id: editProfilePayload.id },
      },
    )
  }
}
