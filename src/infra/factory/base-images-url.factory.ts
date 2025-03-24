import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class BaseImagesUrlFactory {
  constructor(private configService: ConfigService) {}
  get(): string {
    const ENV = this.configService.get<string>("ENV")
    switch (ENV) {
      case "local":
        return this.configService.get<string>("BACKEND_IMGS_URL_LOCAL")
      case "hml":
        return this.configService.get<string>("BACKEND_IMGS_URL_LOCAL")
      case "prod":
        return this.configService.get<string>("BACKEND_IMGS_URL_LOCAL")
      default:
        return this.configService.get<string>("BACKEND_IMGS_URL_LOCAL")
    }
  }
}
