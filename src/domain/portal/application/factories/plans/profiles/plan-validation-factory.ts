import {
  SUBCRIPTION_PLAN_BASIC,
  SUBCRIPTION_PLAN_MID,
  SUBCRIPTION_PLAN_PREMIUM,
  SUBCRIPTION_PLAN_TEMPORARY,
} from "../../../constants/subscription-plans"
import { BasicPlanQuantityProfilesStrategy } from "../../../strategies/plans/profiles/quantity/basic-validation.strategy"
import { MidPlanQuantityProfilesStrategy } from "../../../strategies/plans/profiles/quantity/mid-validation.strategy"
import { PlanProfileValidationStrategy } from "../../../strategies/plans/profiles/quantity/plan-validate.interface.strategy"
import { PremiumPlanQuantityProfilesStrategy } from "../../../strategies/plans/profiles/quantity/premium-validation.strategy"

export class PlanValidationQuantityProfilesFactory {
  static create(planId: string): PlanProfileValidationStrategy {
    switch (planId) {
      case SUBCRIPTION_PLAN_TEMPORARY:
        return new BasicPlanQuantityProfilesStrategy()
      case SUBCRIPTION_PLAN_BASIC:
        return new BasicPlanQuantityProfilesStrategy()
      case SUBCRIPTION_PLAN_MID:
        return new MidPlanQuantityProfilesStrategy()
      case SUBCRIPTION_PLAN_PREMIUM:
        return new PremiumPlanQuantityProfilesStrategy()
      default:
        throw new Error("Plano inválido")
    }
  }
}
