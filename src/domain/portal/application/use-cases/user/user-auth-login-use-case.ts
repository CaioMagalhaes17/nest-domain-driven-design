import { UserRepository } from "../../repositories/user/user-repository"
import { InvalidCredentilsError } from "../../errors/user/invalid-credentials.error"
import { EncrypterGateway } from "../../gateway/user/encrypter.gateway"
import { Either, left, right } from "src/core/Either"
import { User } from "src/domain/portal/enterprise/user/user"

type UserAuthLoginUseCaseResponse = Either<
  InvalidCredentilsError,
  {
    token: string
    user: User
  }
>

export class UserAuthLoginUseCase {
  constructor(private userRepository: UserRepository, private encrypterGateway: EncrypterGateway) {}

  async execute(login: string, password: string) : Promise<UserAuthLoginUseCaseResponse>{
    const user = await this.userRepository.fetchUserByLogin(login)
    if (!user || user.password !== password) return left(new InvalidCredentilsError())
    return right({token: this.encrypterGateway.encrypt({id: user.id, name: user.name}), user})
  }
}