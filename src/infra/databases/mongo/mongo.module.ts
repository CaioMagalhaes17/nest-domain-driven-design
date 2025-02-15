import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"

console.log("aaaaaaa", process.env.MONGO_SRV)
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule acessível globalmente
    }),
    MongooseModule.forRoot(process.env.MONGO_SRV),
  ],
})
export class MongoModule {}
