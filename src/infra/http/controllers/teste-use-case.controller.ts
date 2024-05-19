import { Controller, Get } from '@nestjs/common';
import { TesteUseCase } from '../../../domain/portal/application/use-cases/teste-use-case';

@Controller()
export class TesteController {
  constructor(private testeUseCase: TesteUseCase) {}

  @Get('/teste')
  async handle() {
    return await this.testeUseCase.execute()
  }
}