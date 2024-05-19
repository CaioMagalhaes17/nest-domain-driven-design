import { Module } from '@nestjs/common'
import { TesteController } from './controllers/teste-use-case.controller';
import { TesteUseCase } from '../../domain/portal/application/use-cases/teste-use-case';
import { TesteRepository } from '../../domain/portal/application/repositories/teste-repository';
import { DataBaseModule } from '../databases/database.module';

@Module({
  imports: [DataBaseModule],
  controllers: [
    TesteController
  ],
  providers: [
    {
      provide: TesteUseCase,
      useFactory: (testeRepository: TesteRepository) => {
        return new TesteUseCase(testeRepository)
      },
      inject: [TesteRepository]
    }
  ],
})
export class HttpModule {}