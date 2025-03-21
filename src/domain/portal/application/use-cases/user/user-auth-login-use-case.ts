import { InvalidCredentilsError } from "../../errors/user/invalid-credentials.error"
import { EncrypterGateway } from "../../gateways/user/encrypter.gateway"
import { Either, left, right } from "src/core/Either"
import { User } from "src/domain/portal/enterprise/user/user"
import { IUserRepository } from "../../repositories/user/user-repository.interface"
import { FetchClientProfileUseCase } from "../profile/client/fetch-client-profile-use-case"
import { FetchStoreProfileUseCase } from "../profile/store/fetch-store-profile"
import { FetchStoreProfileByUserIdUseCase } from "../profile/store/fetch-store-profile-by-user-id"

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
    private fetchClientProfile: FetchClientProfileUseCase,
    private fetchStoreProfile: FetchStoreProfileByUserIdUseCase,
  ) {}

  async execute(
    login: string,
    password: string,
    isStore: boolean,
  ): Promise<UserAuthLoginUseCaseResponse> {
    const user = await this.userRepository.fetchUserByLogin(login)
    if (!user) return left(new InvalidCredentilsError())
    if (user.isStore && !isStore) return left(new InvalidCredentilsError())
    if (!user.isStore && isStore) return left(new InvalidCredentilsError())
    const isPasswordValid: boolean =
      await this.encrypterGateway.comparePassword(password, user.password)

    if (!isPasswordValid) return left(new InvalidCredentilsError())
    if (!user.isStore) {
      const profile = await this.fetchClientProfile.execute(user.id)
      if (profile.isLeft()) return left(profile.value)

      return right({
        token: this.encrypterGateway.encryptToken({
          id: user.id,
          name: user.name,
          isStore: user.isStore,
          permission: user.permission,
          profileId: profile.value.profile.id,
        }),
        user,
      })
    } else {
      const storeProfile = await this.fetchStoreProfile.execute(
        user.id.toString(),
      )

      if (storeProfile.isLeft()) return left(storeProfile.value)
      return right({
        token: this.encrypterGateway.encryptToken({
          id: user.id,
          name: user.name,
          isStore: user.isStore,
          permission: user.permission,
          profileId: storeProfile.value.profile.id,
          subscriptionPlanId: user.subscriptionPlanId,
        }),
        user,
      })
    }
  }
}
