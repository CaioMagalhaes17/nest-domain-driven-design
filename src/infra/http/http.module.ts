import { Module } from '@nestjs/common'
import { DataBaseModule } from '../databases/database.module';
import { FetchSolicitationsUseCase } from 'src/domain/portal/application/use-cases/solicitations/fetch-solicitations-use-case';
import { FetchSolicitationsUseCaseController } from './controllers/repair/solicitations/fetch-solicitations-use-case.controller';
import { SolicitationRepository } from 'src/domain/portal/application/repositories/solicitation-repository';
import { UserModule } from './controllers/user/user.module';

@Module({
  imports: [DataBaseModule, UserModule],
  controllers: [
    FetchSolicitationsUseCaseController,
  ],
  providers: [
    {
      provide: FetchSolicitationsUseCase,
      useFactory: (solicitationRepository: SolicitationRepository) => {
        return new FetchSolicitationsUseCase(solicitationRepository)
      },
      inject: [SolicitationRepository]
    },
  ],
})
export class HttpModule {}