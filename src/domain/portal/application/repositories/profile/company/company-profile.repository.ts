import { CompanyProfile } from "src/domain/portal/enterprise/profile/company/company-profile"
import { CreateProfilePayload } from "../../../use-cases/profile/company/create-company-profile"
import { EditProfilePayload } from "../../../use-cases/profile/company/edit-company-profile"

export abstract class CompanyProfileRepository {
  abstract fetchById(profileId: number): Promise<CompanyProfile | void>
  abstract fetchByUserId(userId: number): Promise<CompanyProfile | void>
  abstract deleteById(profileId: number): Promise<void>
  abstract createProfile(
    createProfilePayload: CreateProfilePayload,
  ): Promise<void>
  abstract editProfile(editProfilePayload: EditProfilePayload): Promise<void>
}
