import { PlanValidationStrategy } from "./plan-validate.interface.strategy"

export class BasicPlanValidation implements PlanValidationStrategy {
  validate(): boolean {
    return true
  }
}
