import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { JwtStrategy } from "./stategies/jwt-strategy"
import { DataBaseModule } from "../databases/database.module"
import { ConfigModule, ConfigService } from "@nestjs/config"

@Module({
  imports: [
    DataBaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "50min" },
      }),
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtModule, JwtStrategy],
})
export class AuthModule {}
