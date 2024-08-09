import { Either, left } from "src/core/Either"
import { SolicitationFormRepository } from "../../repositories/repair/solicitation-form.repository"
import { SolicitationRepository } from "../../repositories/repair/solicitation-repository"
import { UnauthorizedSolicitationActionError } from "../../errors/repair/solicitations/UnauthorizedSolicitationAction"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"

type DeleteSolicitationUseCaseResponse = Either<
  SolicitationNotFoundError | UnauthorizedSolicitationActionError,
  void
>

interface DeleteSolicitationUseCaseI {
  userId: string
  solicitationId: number
}
export class DeleteSolicitationUseCase {
  constructor(
    private solicitationRepository: SolicitationRepository,
    private solicitationFormRepository: SolicitationFormRepository,
  ) {}

  async execute({
    userId,
    solicitationId,
  }: DeleteSolicitationUseCaseI): Promise<DeleteSolicitationUseCaseResponse> {
    const solicitation =
      await this.solicitationRepository.fetchById(solicitationId)
    if (!solicitation) return left(new SolicitationNotFoundError())
    if (userId !== solicitation.userId)
      return left(new UnauthorizedSolicitationActionError())
    await this.solicitationRepository.deleteById(solicitationId)
    await this.solicitationFormRepository.deleteById(solicitationId)
  }
}
