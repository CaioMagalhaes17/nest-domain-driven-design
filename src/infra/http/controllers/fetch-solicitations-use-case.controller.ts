import { Controller, Get } from '@nestjs/common';
import { FetchSolicitationsUseCase } from 'src/domain/portal/application/use-cases/fetch-solicitations-use-case';

@Controller()
export class FetchSolicitationsUseCaseController {
  constructor(private fetchSolicitationsUseCase: FetchSolicitationsUseCase) {}

  @Get('/teste')
  async handle() {
    return await this.fetchSolicitationsUseCase.execute()
  }
}