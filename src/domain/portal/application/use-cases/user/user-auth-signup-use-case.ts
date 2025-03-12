import { Either, left, right } from "src/core/Either"
import { EncrypterGateway } from "../../gateways/user/encrypter.gateway"
import { LoginInUseError } from "../../errors/user/login-in-use"
import { User } from "src/domain/portal/enterprise/user/user"

import { IUserRepository } from "../../repositories/user/user-repository.interface"
import { NO_SUBSCRIPTION_PLAN } from "../../constants/subscription-plans"
import { IClientProfileRepository } from "../../repositories/profile/client/client-profile.repository"
import { IStoreProfileRepository } from "../../repositories/profile/store/store-profile.repository"
import { IGeolocationRepository } from "../../repositories/geolocation/geolocation-repository"

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
    private clientProfileRepository: IClientProfileRepository,
    private storeProfileRepository: IStoreProfileRepository,
    private geolocationRepository: IGeolocationRepository,
  ) {}

  async execute({
    name,
    login,
    password,
    isStore,
    permission,
    address,
    telNum,
    location: { lat, lng },
  }: any): Promise<UserAuthSignUpUseCaseResponse> {
    if (await this.userRepository.fetchUserByLogin(login))
      return left(new LoginInUseError())
    const passwordHash = await this.encrypterGateway.encryptPassword(password)
    if (isStore === false) {
      const idNewUser = await this.userRepository.create({
        login,
        password: passwordHash,
        isStore: isStore,
        permission: permission,
      })
      const newUser = await this.userRepository.findById(idNewUser.id)
      const idNewProfile = await this.clientProfileRepository.create({
        userId: newUser.id,
        email: login,
        name: name,
      })
      const newProfile = await this.clientProfileRepository.findById(
        idNewProfile.id,
      )
      return right({
        token: this.encrypterGateway.encryptToken({
          id: newUser.id,
          name: newProfile.name,
          isStore: newUser.isStore,
          permission: newUser.permission,
          profileId: idNewProfile.id,
        }),
        user: newUser,
      })
    } else {
      const idNewUser = await this.userRepository.create({
        login,
        password: passwordHash,
        isStore: isStore,
        permission: permission,
        subscriptionPlanId: NO_SUBSCRIPTION_PLAN,
      })
      const newUser = await this.userRepository.findById(idNewUser.id)
      const idNewProfile = await this.storeProfileRepository.create({
        address,
        telNum,
        email: login,
        userId: idNewUser.id,
        rating: 3,
        name,
        description: "Alterar",
        profileImg:
          "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
      })
      const newProfile = await this.storeProfileRepository.findById(
        idNewProfile.id,
      )
      const geolocation = await this.geolocationRepository.create({
        latitude: lat,
        longitude: lng,
        profileId: newProfile.id,
      })
      return right({
        token: this.encrypterGateway.encryptToken({
          id: newUser.id,
          name: newProfile.name,
          isStore: newUser.isStore,
          permission: newUser.permission,
          profileId: newProfile.id,
          subscriptionPlanId: NO_SUBSCRIPTION_PLAN,
        }),
        user: newUser,
      })
    }
  }
}
