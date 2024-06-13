import { Controller, Get } from '@nestjs/common';
import { FetchSolicitationsUseCase } from 'src/domain/portal/application/use-cases/fetch-solicitations-use-case';
import { SolicitationsPresenter } from 'src/infra/presenters/repair/solicitations.presenter';
@Controller()
export class FetchSolicitationsUseCaseController {
  constructor(private fetchSolicitationsUseCase: FetchSolicitationsUseCase) {}

  @Get('/solicitations')
  async handle() {
    const response = await this.fetchSolicitationsUseCase.execute()
    return SolicitationsPresenter.toHttp(response)
  }
}