import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule acessível globalmente
    }),
    MongooseModule.forRoot(
      "mongodb+srv://appupx:appupx2024@cluster0.pqmup.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    ),
  ],
})
export class MongoModule {}
