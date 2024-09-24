import { UseCaseError } from "src/core/errors/use-case-errors"

export class UnauthorizedSolicitationActionError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("Usuário não tem permissão para ação.")
  }
}
