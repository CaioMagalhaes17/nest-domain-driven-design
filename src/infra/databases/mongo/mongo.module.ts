import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule acessível globalmente
    }),
    MongooseModule.forRoot(
      "mongodb+srv://dbcell:bbEuhmnzOgmMawYf@cluster0.pqmup.mongodb.net/db_cell",
    ),
  ],
})
export class MongoModule {}
