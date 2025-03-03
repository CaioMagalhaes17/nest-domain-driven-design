import { Either, left, right } from "@/core/Either"
import { PlanProfileValidationStrategy } from "./plan-validate.interface.strategy"
import { MaxProfilesExceed } from "@/domain/portal/application/errors/profile/MaxProfilesExceed"

export class MidPlanQuantityProfilesStrategy
  implements PlanProfileValidationStrategy {
  validate(profilesCount: number): Either<MaxProfilesExceed, true> {
    if (profilesCount >= 2) {
      return left(
        new MaxProfilesExceed(
          "O limite de perfis para o tipo de plano MÉDIO é de 2 por usuário",
        ),
      )
    }
    return right(true)
  }
}
