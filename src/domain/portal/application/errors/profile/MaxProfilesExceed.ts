import { UseCaseError } from "src/core/errors/use-case-errors"

export class MaxProfilesExceed extends Error implements UseCaseError {
  constructor() {
    super("Limite de perfis atingido")
  }
}
