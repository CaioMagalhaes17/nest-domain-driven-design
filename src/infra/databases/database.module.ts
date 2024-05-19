import { Module } from '@nestjs/common'
import { SequelizeSolicitationRepository } from './sequelize/repositories/solicitation-repository';
import { Sequelize } from 'sequelize-typescript';
import { Solicitation } from './sequelize/model/solicitation.model';
import { SolicitationRepository } from 'src/domain/portal/application/repositories/solicitation-repository';

@Module({
  providers: [
    {
      provide: SolicitationRepository,
      useFactory: (solicitation: Solicitation) => {
        return new SequelizeSolicitationRepository(solicitation)
      },
      inject: [Sequelize]
    }
  ],
  exports: [
    SolicitationRepository
  ]
})
export class DataBaseModule {}