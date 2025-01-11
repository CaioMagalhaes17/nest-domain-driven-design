import { Either, left } from "src/core/Either"
import { UnauthorizedSolicitationActionError } from "../../errors/repair/solicitations/UnauthorizedSolicitationAction"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { ISolicitationFormRepository } from "../../repositories/repair/solicitation-form.repository.interface"
import { IClientProfileRepository } from "../../repositories/profile/client/client-profile.repository"

type DeleteSolicitationUseCaseResponse = Either<
  SolicitationNotFoundError | UnauthorizedSolicitationActionError,
  void
>

interface DeleteSolicitationUseCaseI {
  userId: string
  solicitationId: string
}
export class DeleteSolicitationUseCase {
  constructor(
    private solicitationRepository: ISolicitationRepository,
    private solicitationFormRepository: ISolicitationFormRepository,
    private clientProfileRepository: IClientProfileRepository,
  ) {}

  async execute({
    userId,
    solicitationId,
  }: DeleteSolicitationUseCaseI): Promise<DeleteSolicitationUseCaseResponse> {
    const solicitation =
      await this.solicitationRepository.findById(solicitationId)
    if (!solicitation) return left(new SolicitationNotFoundError())

    const profile = await this.clientProfileRepository.findByParam<{
      userId: string
    }>({ userId })
    if (userId !== profile[0].userId)
      return left(new UnauthorizedSolicitationActionError())
    await this.solicitationRepository.deleteById(solicitationId)
    await this.solicitationFormRepository.deleteById(solicitation.form.id)
  }
}
