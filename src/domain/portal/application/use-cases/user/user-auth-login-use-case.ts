import { InvalidCredentilsError } from "../../errors/user/invalid-credentials.error"
import { EncrypterGateway } from "../../gateway/user/encrypter.gateway"
import { Either, left, right } from "src/core/Either"
import { User } from "src/domain/portal/enterprise/user/user"
import { IUserRepository } from "../../repositories/user/user-repository.interface"
import { IClientProfileRepository } from "../../repositories/profile/client/client-profile.repository"
import { IStoreProfileRepository } from "../../repositories/profile/store/store-profile.repository"

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
    private clientProfileRepository: IClientProfileRepository,
    private storeProfileRepository: IStoreProfileRepository,
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

    if (!user.isStore) {
      const profile = await this.clientProfileRepository.findByParam<{
        userId: string
      }>({ userId: user.id })
      if (profile.length > 0) {
        return right({
          token: this.encrypterGateway.encryptToken({
            id: user.id,
            name: user.name,
            isStore: user.isStore,
            permission: user.permission,
            profileId: profile[0].id,
          }),
          user,
        })
      }
    } else {
      const storeProfile = await this.storeProfileRepository.findByParam<{
        userId
      }>({ userId: user.id })
      if (storeProfile.length > 0) {
        return right({
          token: this.encrypterGateway.encryptToken({
            id: user.id,
            name: user.name,
            isStore: user.isStore,
            permission: user.permission,
            profileId: storeProfile[0].id,
            subscriptionPlanId: user.subscriptionPlanId,
          }),
          user,
        })
      }
    }
  }
}
