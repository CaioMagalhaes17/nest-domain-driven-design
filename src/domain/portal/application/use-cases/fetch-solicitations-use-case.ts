import { SolicitationRepository } from '../repositories/solicitation-repository'

export class FetchSolicitationsUseCase {
  constructor(private solicitationRepository: SolicitationRepository) {}

  async execute() {
    const solicitation = await this.solicitationRepository.fetchSolicitations()
    return solicitation
  }
}