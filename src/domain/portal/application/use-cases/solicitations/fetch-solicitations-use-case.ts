import { SolicitationRepository } from '../../repositories/solicitation-repository'

export class FetchSolicitationsUseCase {
  constructor(private solicitationRepository: SolicitationRepository) {}

  async execute(userId: string) {
    const solicitation = await this.solicitationRepository.fetchSolicitations(userId)
    return solicitation
  }
}