import { UseCaseError } from "src/core/errors/use-case-errors"

export class GeolocationNotFound extends Error implements UseCaseError {
  constructor() {
    super("Não foi encontrado nenhum dado sobre Localização")
  }
}
