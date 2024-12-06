import { Module } from "@nestjs/common"
import { HttpModule } from "./http/http.module"
import { ConfigModule } from "@nestjs/config"
import { SequelizeModule } from "@nestjs/sequelize"
import { BullModule } from "@nestjs/bull"
import { ConsumersModule } from "./consumers/consumers.module"
import { QueueModule } from "./queue/queue.module"
import { SequelizeConfigService } from "./databases/sequelize/sequelize-config.service"

@Module({
  imports: [
    HttpModule,
    // ConsumersModule,
    QueueModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    BullModule.forRoot({
      redis: {
        host: "localhost", // ou a URL do seu Redis
        port: 6379,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
