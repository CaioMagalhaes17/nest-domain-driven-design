import { UseCaseError } from "src/core/errors/use-case-errors"

export class InvalidCredentilsError extends Error implements UseCaseError {
  constructor() {
    super("Não autorizado, usuário e/ou senha inválidos.")
  }
}
