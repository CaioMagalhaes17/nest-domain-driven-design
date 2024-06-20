import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./stategies/jwt-strategy";
import { UserRepository } from "src/domain/portal/application/repositories/user/user-repository";
import { DataBaseModule } from "../databases/database.module";
import { UserAuthLoginUseCase } from "src/domain/portal/application/use-cases/user/user-auth-login-use-case";
import { EncrypterGateway } from "src/domain/portal/application/gateway/user/encrypter.gateway";

@Module({
  imports: [
    DataBaseModule,
    JwtModule.register({
      secret: 'asdasd',
      signOptions: { expiresIn: '10min' },
    })
  ],
  providers: [JwtStrategy],
  exports: [JwtModule, JwtStrategy]  
})

export class AuthModule {}