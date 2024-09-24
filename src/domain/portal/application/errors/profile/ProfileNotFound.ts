import { UseCaseError } from "src/core/errors/use-case-errors"

export class ProfileNotFound extends Error implements UseCaseError {
  constructor() {
    super("Perfil não encontrado")
  }
}
