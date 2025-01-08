import { UseCaseError } from "src/core/errors/use-case-errors"

export class GeolocationIncorrectValues extends Error implements UseCaseError {
  constructor() {
    super("Valores inválidos para localização")
  }
}
