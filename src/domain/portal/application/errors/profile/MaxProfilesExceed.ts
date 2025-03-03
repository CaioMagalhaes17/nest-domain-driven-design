import { UseCaseError } from "src/core/errors/use-case-errors"

export class MaxProfilesExceed extends Error implements UseCaseError {
  constructor(message: string) {
    super(message)
  }
}
