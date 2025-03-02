import { Either, left, right } from "src/core/Either"
import { EncrypterGateway } from "../../gateways/user/encrypter.gateway"
import { LoginInUseError } from "../../errors/user/login-in-use"
import { User } from "src/domain/portal/enterprise/user/user"
import { UserSignUpDTO } from "../../dto/user-signup.dto"
import { IUserRepository } from "../../repositories/user/user-repository.interface"
import { SUBCRIPTION_PLAN_LEVEL_1 } from "../../constants/subscription-plans"

type UserAuthSignUpUseCaseResponse = Either<
  LoginInUseError,
  {
    token: string
    user: User
  }
>

export class UserAuthSignUpUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encrypterGateway: EncrypterGateway,
  ) {}

  async execute({
    name,
    login,
    password,
    isStore,
    permission,
  }: UserSignUpDTO): Promise<UserAuthSignUpUseCaseResponse> {
    if (await this.userRepository.fetchUserByLogin(login))
      return left(new LoginInUseError())
    const passwordHash = await this.encrypterGateway.encryptPassword(password)
    if (isStore === false) {
      const idNewUser = await this.userRepository.create({
        name,
        login,
        password: passwordHash,
        isStore: isStore,
        permission: permission,
      })
      const newUser = await this.userRepository.findById(idNewUser.id)
      return right({
        token: this.encrypterGateway.encryptToken({
          id: newUser.id,
          name: newUser.name,
          isStore: newUser.isStore,
          permission: newUser.permission,
        }),
        user: newUser,
      })
    } else {
      const idNewUser = await this.userRepository.create({
        name,
        login,
        password: passwordHash,
        isStore: isStore,
        permission: permission,
        subscriptionPlanId: SUBCRIPTION_PLAN_LEVEL_1,
      })
      const newUser = await this.userRepository.findById(idNewUser.id)
      return right({
        token: this.encrypterGateway.encryptToken({
          id: newUser.id,
          name: newUser.name,
          isStore: newUser.isStore,
          permission: newUser.permission,
          subscriptionPlanId: SUBCRIPTION_PLAN_LEVEL_1,
        }),
        user: newUser,
      })
    }
  }
}
