import { StoreProfile } from "src/domain/portal/enterprise/profile/store/store-profile"
import { CreateStoreProfilePayload } from "../../../use-cases/profile/store/create-store-profile"
import { EditStoreProfilePayload } from "../../../use-cases/profile/store/edit-store-profile"

export abstract class CompanyProfileRepository {
  abstract fetchById(profileId: number): Promise<StoreProfile | void>
  abstract fetchByUserId(userId: number): Promise<StoreProfile | void>
  abstract deleteById(profileId: number): Promise<void>
  abstract createProfile(
    createProfilePayload: CreateStoreProfilePayload,
  ): Promise<void>
  abstract editProfile(
    editProfilePayload: EditStoreProfilePayload,
  ): Promise<void>
}
