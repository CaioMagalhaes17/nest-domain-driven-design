import { Either, left, right } from "src/core/Either"
import { EncrypterGateway } from "../../gateways/user/encrypter.gateway"
import { LoginInUseError } from "../../errors/user/login-in-use"
import { User } from "src/domain/portal/enterprise/user/user"

import { IUserRepository } from "../../repositories/user/user-repository.interface"
import { NO_SUBSCRIPTION_PLAN } from "../../constants/subscription-plans"
import { CreateStoreContactsUseCase } from "../profile/store/contacts/create-store-contacts"
import { CreateClientProfileUseCase } from "../profile/client/create-client-profile-use-case"
import { UserAlreadyHasProfile } from "../../errors/profile/UserAlreadyHasProfile"
import { CreateStoreProfileUseCase } from "../profile/store/create-store-profile"
import { CreateGeolocationUseCase } from "../geolocation/create-geolocation-use-case"

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
    private createStoreProfileContact: CreateStoreContactsUseCase,
    private createClientProfile: CreateClientProfileUseCase,
    private createStoreProfile: CreateStoreProfileUseCase,
    private createGeolocation: CreateGeolocationUseCase,
  ) {}

  async execute({
    name,
    login,
    password,
    isStore,
    permission,
    address,
    telNum,
    useTelNumAsWpp,
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
      const idNewProfile = await this.createClientProfile.execute({
        userId: newUser.id,
        email: login,
        name: name,
      })
      if (idNewProfile.isLeft()) return left(new UserAlreadyHasProfile())
      return right({
        token: this.encrypterGateway.encryptToken({
          id: newUser.id,
          name: name,
          isStore: newUser.isStore,
          permission: newUser.permission,
          profileId: idNewProfile.value,
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
      const idNewProfile = await this.createStoreProfile.execute(
        {
          address,
          telNum,
          email: login,
          userId: idNewUser.id,
          name,
          profileImg:
            "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        },
        "0",
      )
      if (idNewProfile.isLeft()) return left(idNewProfile.value)

      await this.createStoreProfileContact.execute(idNewProfile.value, {
        telNum,
        wppNum: useTelNumAsWpp ? telNum : "",
        storeProfileId: idNewProfile.value,
        email: login,
      })

      await this.createGeolocation.execute(
        {
          latitude: lat,
          longitude: lng,
        },
        idNewProfile.value,
      )
      return right({
        token: this.encrypterGateway.encryptToken({
          id: newUser.id,
          name: name,
          isStore: newUser.isStore,
          permission: newUser.permission,
          profileId: idNewProfile.value,
          subscriptionPlanId: NO_SUBSCRIPTION_PLAN,
        }),
        user: newUser,
      })
    }
  }
}
