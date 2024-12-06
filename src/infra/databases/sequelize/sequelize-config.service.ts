import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from "@nestjs/sequelize"
import { User } from "./model/user/user.model"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

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
      models: [User],
      autoLoadModels: true, // Opcional: carrega automaticamente os modelos
      synchronize: true, // Opcional: sincroniza os modelos com o banco de dados
    }
  }
}
