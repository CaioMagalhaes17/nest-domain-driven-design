import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from "@nestjs/sequelize"
import { Solicitation } from "./model/repair/solicitation.model"
import { SolicitationForm } from "./model/repair/form.model"
import { User } from "./model/user/user.model"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Budget } from "./model/repair/budget.model"
import { ClientProfile } from "./model/profile/client/client-profile.model"
import { CompanyProfile } from "./model/profile/company/company-profile.model"
import { Geolocation } from "./model/geolocation/geolocation"

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: "mysql",
      host: this.configService.get<string>("DATABASE_HOST"),
      port: this.configService.get<number>("DATABASE_PORT"),
      username: this.configService.get<string>("DATABASE_USERNAME"),
      password: this.configService.get<string>("DATABASE_PASSWORD"),
      database: this.configService.get<string>("DATABASE_NAME"),
      models: [
        Solicitation,
        SolicitationForm,
        User,
        Budget,
        ClientProfile,
        CompanyProfile,
        Geolocation,
      ],
      autoLoadModels: true, // Opcional: carrega automaticamente os modelos
      synchronize: true, // Opcional: sincroniza os modelos com o banco de dados
    }
  }
}
