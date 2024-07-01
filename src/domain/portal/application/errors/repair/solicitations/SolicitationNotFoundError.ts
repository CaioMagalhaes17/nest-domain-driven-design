import { UseCaseError } from "src/core/errors/use-case-errors"

export class SolicitationNotFoundError extends Error implements UseCaseError {
  constructor() {
    super("Transferência não encontrada.")
  }
}
