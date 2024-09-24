import { Either, left, right } from "src/core/Either"
import { EncrypterGateway } from "../../gateway/user/encrypter.gateway"
import { UserRepository } from "../../repositories/user/user-repository"
import { LoginInUseError } from "../../errors/user/login-in-use"
import { User } from "src/domain/portal/enterprise/user/user"
import { UserSignUpDTO } from "../../dto/user-signup.dto"

type UserAuthSignUpUseCaseResponse = Either<
  LoginInUseError,
  {
    token: string
    user: User
  }
>

export class UserAuthSignUpUseCase {
  constructor(
    private userRepository: UserRepository,
    private encrypterGateway: EncrypterGateway,
  ) {}

  async execute({
    name,
    login,
    password,
    isStore,
  }: UserSignUpDTO): Promise<UserAuthSignUpUseCaseResponse> {
    if (await this.userRepository.fetchUserByLogin(login))
      return left(new LoginInUseError())
    const passwordHash = await this.encrypterGateway.encryptPassword(password)
    const newUser = await this.userRepository.createNewUser(
      name,
      login,
      passwordHash,
      isStore ? "true" : "false",
    )
    return right({
      token: this.encrypterGateway.encryptToken({
        id: newUser.id,
        name: newUser.name,
        isStore: newUser.isStore,
      }),
      user: newUser,
    })
  }
}
