import { UseCaseError } from "src/core/errors/use-case-errors"

export class ProfileActionNotAllowed extends Error implements UseCaseError {
  constructor() {
    super("Ação não permitida!")
  }
}
