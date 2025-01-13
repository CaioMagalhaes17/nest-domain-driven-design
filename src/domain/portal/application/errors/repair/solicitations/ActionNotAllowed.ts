import { UseCaseError } from "src/core/errors/use-case-errors"

export class ActionNotAllowedError extends Error implements UseCaseError {
  constructor() {
    super("Ação proibida para solicitação")
  }
}
