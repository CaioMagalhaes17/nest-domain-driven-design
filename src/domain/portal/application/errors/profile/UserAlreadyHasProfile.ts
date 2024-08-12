import { UseCaseError } from "src/core/errors/use-case-errors"

export class UserAlreadyHasProfile extends Error implements UseCaseError {
  constructor() {
    super("Já existe um perfil cadastrado com esse ID")
  }
}
