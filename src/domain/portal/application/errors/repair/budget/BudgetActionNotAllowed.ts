import { UseCaseError } from "src/core/errors/use-case-errors"

export class BudgetActionNotAllowed extends Error implements UseCaseError {
  constructor() {
    super("Você não tem permissões para realizar ação!")
  }
}
