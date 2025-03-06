import { UseCaseError } from "src/core/errors/use-case-errors"

export class EmptyStoresInsideClientGeolocation
  extends Error
  implements UseCaseError {
  constructor() {
    super("Não foram encontradas nenhuma loja dentro da sua localização.")
  }
}
