import { UseCaseError } from "src/core/errors/use-case-errors"

export class BudgetAlreadySent extends Error implements UseCaseError {
  constructor() {
    super("Você já realizou um orçamento para essa solicitação")
  }
}
