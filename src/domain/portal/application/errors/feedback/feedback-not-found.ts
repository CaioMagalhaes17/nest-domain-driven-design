import { UseCaseError } from "src/core/errors/use-case-errors"

export class FeedbackNotFound extends Error implements UseCaseError {
  constructor() {
    super("Não foi encontrado nenhuma avaliação")
  }
}
