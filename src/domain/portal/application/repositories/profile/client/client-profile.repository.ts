import { ClientProfile } from "src/domain/portal/enterprise/profile/client/client-profile"
import { EditProfilePayload } from "../../../use-cases/profile/client/edit-client-profile-use-case"
import { CreateProfilePayload } from "../../../use-cases/profile/client/create-client-profile-use-case"

export abstract class ClientProfileRepository {
  abstract fetchById(profileId: number): Promise<ClientProfile | void>
  abstract fetchByUserId(userId: number): Promise<ClientProfile | void>
  abstract deleteById(profileId: number): Promise<void>
  abstract createProfile(
    createProfilePayload: CreateProfilePayload,
  ): Promise<void>
  abstract editProfile(editProfilePayload: EditProfilePayload): Promise<void>
}
