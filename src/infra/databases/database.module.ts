import { Module } from '@nestjs/common'
import { TesteRepository } from '../../domain/portal/application/repositories/teste-repository';
import { SolicitationRepository } from './sequelize/repositories/solicitation-repository';
import { Sequelize } from 'sequelize-typescript';
import { Solicitation } from './sequelize/model/solicitation.model';

@Module({
  providers: [
    {
      provide: TesteRepository,
      useFactory: (solicitation: Solicitation) => {
        return new SolicitationRepository(solicitation)
      },
      inject: [Sequelize]
    }
  ],
  exports: [
    TesteRepository
  ]
})
export class DataBaseModule {}