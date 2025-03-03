import { Either } from "@/core/Either"
import { MaxProfilesExceed } from "@/domain/portal/application/errors/profile/MaxProfilesExceed"

export interface PlanProfileValidationStrategy {
  validate(profilesCount: number): Either<MaxProfilesExceed, true>
}
