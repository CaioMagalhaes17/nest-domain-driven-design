import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { JwtStrategy } from "./stategies/jwt-strategy"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { UserDatabaseModule } from "../databases/user-database.module"

@Module({
  imports: [
    UserDatabaseModule,
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
