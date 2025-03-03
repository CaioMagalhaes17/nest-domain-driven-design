import { Either, left, right } from "@/core/Either"
import { PlanProfileValidationStrategy } from "./plan-validate.interface.strategy"
import { MaxProfilesExceed } from "@/domain/portal/application/errors/profile/MaxProfilesExceed"

export class BasicPlanQuantityProfilesStrategy
  implements PlanProfileValidationStrategy {
  validate(profilesCount: number): Either<MaxProfilesExceed, true> {
    if (profilesCount >= 1) {
      return left(
        new MaxProfilesExceed(
          "O limite de perfis para o tipo de plano BÁSICO é de 1 por usuário",
        ),
      )
    }
    return right(true)
  }
}
