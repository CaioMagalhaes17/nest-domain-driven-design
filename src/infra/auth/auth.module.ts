import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { JwtStrategy } from "./stategies/jwt-strategy"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { UserMongoModule } from "../databases/mongo/user.module"

@Module({
  imports: [
    UserMongoModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "500min" },
      }),
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtModule, JwtStrategy],
})
export class AuthModule {}
