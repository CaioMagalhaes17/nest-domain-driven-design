import { UseCaseError } from "src/core/errors/use-case-errors";

export class LoginInUseError extends Error implements UseCaseError {
  constructor() {
    super('Login já existe')
  }
}