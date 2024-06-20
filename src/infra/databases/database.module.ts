import { Module } from '@nestjs/common'
import { SequelizeSolicitationRepository } from './sequelize/repositories/repair/solicitation-repository';
import { Sequelize } from 'sequelize-typescript';
import { Solicitation } from './sequelize/model/repair/solicitation.model';
import { SolicitationRepository } from 'src/domain/portal/application/repositories/solicitation-repository';
import { UserRepository } from 'src/domain/portal/application/repositories/user/user-repository';
import { User } from './sequelize/model/user/user.model';
import { SequelizeUserRepository } from './sequelize/repositories/user/user-repository';
import { UserMapper } from './sequelize/mappers/user/user-mapper';

@Module({
  providers: [
    {
      provide: SolicitationRepository,
      useFactory: (solicitation: Solicitation) => {
        return new SequelizeSolicitationRepository(solicitation)
      },
      inject: [Sequelize]
    },
    {
      provide: UserRepository,
      useFactory: (user: User) => {
        return new SequelizeUserRepository(user)
      },
      inject: [Sequelize]
    }
  ],
  exports: [
    SolicitationRepository,
    UserRepository
  ]
})
export class DataBaseModule {}