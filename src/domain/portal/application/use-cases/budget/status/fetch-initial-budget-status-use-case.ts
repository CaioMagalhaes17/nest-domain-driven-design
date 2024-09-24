import { PossibleBudgetStatus } from "../../../constraints/repair/budget/status"

export class FetchInitialBudgetStatusUseCase {
  static execute(): string {
    return PossibleBudgetStatus[0]
  }
}
