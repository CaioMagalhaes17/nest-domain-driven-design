import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"

export class CreateSolicitationUseCase {
  constructor(
    private readonly solicitationRepository: ISolicitationRepository,
  ) {}

  async execute(data: { status: string; fk_id_user: number }) {
    console.log(data, this.solicitationRepository)
    const result = await this.solicitationRepository.getevery()
    console.log(result)
    return result
  }
}
