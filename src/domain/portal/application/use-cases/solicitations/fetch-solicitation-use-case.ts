import { Either, left, right } from "src/core/Either"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { Solicitation } from "src/domain/portal/enterprise/repair/solicitation"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"

type FetchSolicitationUseCaseResponse = Either<
  SolicitationNotFoundError,
  {
    solicitation: Solicitation
  }
>

export class FetchSolicitationUseCase {
  constructor(private solicitationRepository: ISolicitationRepository) {}

  async execute(
    solicitationId: string,
  ): Promise<FetchSolicitationUseCaseResponse> {
    const solicitation =
      await this.solicitationRepository.findById(solicitationId)
    if (!solicitation) return left(new SolicitationNotFoundError())

    return right({ solicitation })
  }
}
