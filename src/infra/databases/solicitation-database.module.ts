import { Module } from "@nestjs/common"
import { SolicitationFormRepository } from "src/domain/portal/application/repositories/repair/solicitation-form.repository"
import { SolicitationRepository } from "src/domain/portal/application/repositories/repair/solicitation-repository"
import { SequelizeSolicitationRepository } from "./sequelize/repositories/repair/solicitation/solicitation-repository"
import { SequelizeSolicitationFormRepository } from "./sequelize/repositories/repair/solicitation/solicitation-form.repository"
import { Sequelize } from "sequelize-typescript"
import { Solicitation } from "./sequelize/model/repair/solicitation.model"

@Module({
  providers: [
    {
      provide: SolicitationRepository,
      useFactory: (solicitation: Solicitation) => {
        return new SequelizeSolicitationRepository(solicitation)
      },
      inject: [Sequelize],
    },
    {
      provide: SolicitationFormRepository,
      useFactory: () => {
        return new SequelizeSolicitationFormRepository()
      },
      inject: [Sequelize],
    },
  ],
  exports: [SolicitationFormRepository, SolicitationRepository],
})
export class SolicitationDatabaseModule {}
