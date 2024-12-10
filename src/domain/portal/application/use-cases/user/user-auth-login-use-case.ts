import { InvalidCredentilsError } from "../../errors/user/invalid-credentials.error"
import { EncrypterGateway } from "../../gateway/user/encrypter.gateway"
import { Either, left, right } from "src/core/Either"
import { User } from "src/domain/portal/enterprise/user/user"
import { IUserRepository } from "../../repositories/user/user-repository.interface"

type UserAuthLoginUseCaseResponse = Either<
  InvalidCredentilsError,
  {
    token: string
    user: User
  }
>

export class UserAuthLoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encrypterGateway: EncrypterGateway,
  ) {}

  async execute(
    login: string,
    password: string,
  ): Promise<UserAuthLoginUseCaseResponse> {
    const user = await this.userRepository.fetchUserByLogin(login)
    if (!user) return left(new InvalidCredentilsError())
    const isPasswordValid: boolean =
      await this.encrypterGateway.comparePassword(password, user.password)
    if (!isPasswordValid) return left(new InvalidCredentilsError())
    return right({
      token: this.encrypterGateway.encryptToken({
        id: user.id,
        name: user.name,
        isStore: user.isStore,
        permission: "ADMIN",
      }),
      user,
    })
  }
}
