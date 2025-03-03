import { PlanValidationStrategy } from "./plan-validate.interface.strategy"

export class MidPlanValidation implements PlanValidationStrategy {
  validate(): boolean {
    return true
  }
}
