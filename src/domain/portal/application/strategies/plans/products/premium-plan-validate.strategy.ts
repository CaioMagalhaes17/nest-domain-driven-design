import { PlanValidationStrategy } from "./plan-validate.interface.strategy"

export class PremiumPlanValidation implements PlanValidationStrategy {
  validate(): boolean {
    return true
  }
}
