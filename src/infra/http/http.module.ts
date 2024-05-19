import { Module } from '@nestjs/common'
import { DataBaseModule } from '../databases/database.module';
import { FetchSolicitationsUseCase } from 'src/domain/portal/application/use-cases/fetch-solicitations-use-case';
import { FetchSolicitationsUseCaseController } from './controllers/fetch-solicitations-use-case.controller';
import { SolicitationRepository } from 'src/domain/portal/application/repositories/solicitation-repository';

@Module({
  imports: [DataBaseModule],
  controllers: [
    FetchSolicitationsUseCaseController
  ],
  providers: [
    {
      provide: FetchSolicitationsUseCase,
      useFactory: (solicitationRepository: SolicitationRepository) => {
        return new FetchSolicitationsUseCase(solicitationRepository)
      },
      inject: [SolicitationRepository]
    }
  ],
})
export class HttpModule {}