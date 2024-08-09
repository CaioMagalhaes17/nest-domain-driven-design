import { UseCaseError } from "src/core/errors/use-case-errors"

export class BudgetNotFound extends Error implements UseCaseError {
  constructor() {
    super("Sem resultados de orçamento(s)")
  }
}
