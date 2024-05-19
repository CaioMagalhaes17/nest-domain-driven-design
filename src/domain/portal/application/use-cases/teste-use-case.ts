import { TesteRepository } from "../repositories/teste-repository";

export class TesteUseCase {
  constructor(private testeRepository: TesteRepository) {}

  async execute(){
    const domainTest = await this.testeRepository.getTeste()
    return domainTest.name
  }
}