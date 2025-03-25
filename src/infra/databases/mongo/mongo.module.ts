import { MongoSrvUrlFactory } from "@/infra/factory/mongo-srv.factory"
import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule acessível globalmente
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Importa ConfigModule para usar ConfigService
      inject: [ConfigService], // Injeta ConfigService para resolver a URL dinamicamente
      useFactory: (configService: ConfigService) => {
        const mongoUrlFactory = new MongoSrvUrlFactory(configService)
        return {
          uri: mongoUrlFactory.get(), // Obtém a URL do MongoDB da factory
        }
      },
    }),
  ],
})
export class MongoModule {}
