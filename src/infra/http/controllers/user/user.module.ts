import { Module } from "@nestjs/common"
import { DataBaseModule } from "src/infra/databases/database.module"
import { UserController } from "./user.controller"
import { AuthModule } from "src/infra/auth/auth.module"
import { UserAuthLoginUseCase } from "src/domain/portal/application/use-cases/user/user-auth-login-use-case"
import { UserRepository } from "src/domain/portal/application/repositories/user/user-repository"
import { EncrypterGateway } from "src/domain/portal/application/gateway/user/encrypter.gateway"
import { CryptographyModule } from "src/infra/auth/cryptography/cryptography.module"
import { UserAuthSignUpUseCase } from "src/domain/portal/application/use-cases/user/user-auth-signup-use-case"

@Module({
  imports: [CryptographyModule, DataBaseModule, AuthModule],
  controllers: [UserController],
  providers: [
    {
      provide: UserAuthLoginUseCase,
      useFactory: (
        userRepository: UserRepository,
        encrypterGateway: EncrypterGateway,
      ) => {
        return new UserAuthLoginUseCase(userRepository, encrypterGateway)
      },
      inject: [UserRepository, EncrypterGateway],
    },
    {
      provide: UserAuthSignUpUseCase,
      useFactory: (
        userRepository: UserRepository,
        encrypterGateway: EncrypterGateway,
      ) => {
        return new UserAuthSignUpUseCase(userRepository, encrypterGateway)
      },
      inject: [UserRepository, EncrypterGateway],
    },
  ],
})
export class UserModule {}
