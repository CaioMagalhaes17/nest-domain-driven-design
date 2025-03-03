import { Either, right } from "@/core/Either"
import { PlanProfileValidationStrategy } from "./plan-validate.interface.strategy"

export class PremiumPlanQuantityProfilesStrategy
  implements PlanProfileValidationStrategy {
  validate(): Either<null, true> {
    return right(true)
  }
}
