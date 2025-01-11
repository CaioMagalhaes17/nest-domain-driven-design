import { Either, left } from "src/core/Either"
import { UnauthorizedSolicitationActionError } from "../../errors/repair/solicitations/UnauthorizedSolicitationAction"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { ISolicitationFormRepository } from "../../repositories/repair/solicitation-form.repository.interface"

type DeleteSolicitationUseCaseResponse = Either<
  SolicitationNotFoundError | UnauthorizedSolicitationActionError,
  void
>

interface DeleteSolicitationUseCaseI {
  profileId: string
  solicitationId: string
}
export class DeleteSolicitationUseCase {
  constructor(
    private solicitationRepository: ISolicitationRepository,
    private solicitationFormRepository: ISolicitationFormRepository,
  ) {}

  async execute({
    profileId,
    solicitationId,
  }: DeleteSolicitationUseCaseI): Promise<DeleteSolicitationUseCaseResponse> {
    const solicitation =
      await this.solicitationRepository.findById(solicitationId)
    if (!solicitation) return left(new SolicitationNotFoundError())

    if (solicitation.clientProfile.id.toString() !== profileId)
      return left(new UnauthorizedSolicitationActionError())
    await this.solicitationRepository.deleteById(solicitationId)
    await this.solicitationFormRepository.deleteById(solicitation.form.id)
  }
}
