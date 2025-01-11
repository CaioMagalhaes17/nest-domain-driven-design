import { Module } from "@nestjs/common"
import { HttpModule } from "./http/http.module"
import { ConfigModule } from "@nestjs/config"
import { BullModule } from "@nestjs/bull"
import { QueueModule } from "./queue/queue.module"
import { MongoModule } from "./databases/mongo/mongo.module"
import { ConsumersModule } from "./consumers/consumers.module"
import { BullBoardModule } from "@bull-board/nestjs"
import { ExpressAdapter } from "@bull-board/express"

@Module({
  imports: [
    HttpModule,
    MongoModule,
    ConsumersModule,
    QueueModule,
    BullModule.forRoot({
      redis: {
        host: "localhost", // ou a URL do seu Redis
        port: 6379,
      },
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 1000,
        },
      },
    }),
    BullBoardModule.forRoot({
      route: "/queues",
      adapter: ExpressAdapter, // Or FastifyAdapter from `@bull-board/fastify`
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
