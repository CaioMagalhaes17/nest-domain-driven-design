import { Module } from "@nestjs/common"
import { HttpModule } from "./http/http.module"
import { ConfigModule } from "@nestjs/config"
import { BullModule } from "@nestjs/bull"
import { QueueModule } from "./queue/queue.module"
import { MongoModule } from "./databases/mongo/mongo.module"

@Module({
  imports: [
    HttpModule,
    MongoModule,
    // ConsumersModule,
    QueueModule,
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
