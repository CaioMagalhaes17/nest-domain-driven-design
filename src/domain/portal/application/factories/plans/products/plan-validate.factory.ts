import { BasicPlanValidation } from "../../../strategies/plans/products/basic-plan-validate.strategy"
import { PlanValidationStrategy } from "../../../strategies/plans/products/plan-validate.interface.strategy"
import { PremiumPlanValidation } from "../../../strategies/plans/products/premium-plan-validate.strategy"

export class PlanValidationFactory {
  static create(planId: string): PlanValidationStrategy {
    switch (planId) {
      case "BASIC":
        return new BasicPlanValidation()
      case "PREMIUM":
        return new PremiumPlanValidation()
      default:
        throw new Error("Plano inválido")
    }
  }
}
