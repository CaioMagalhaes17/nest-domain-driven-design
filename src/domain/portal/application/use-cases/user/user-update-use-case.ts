import { User } from "@/domain/portal/enterprise/user/user"
import { EncrypterGateway } from "../../gateways/user/encrypter.gateway"
import { IUserRepository } from "../../repositories/user/user-repository.interface"
import { Either, left, right } from "@/core/Either"
import { NotFoundException } from "@nestjs/common"
import { FetchClientProfileUseCase } from "../profile/client/fetch-client-profile-use-case"
import { ProfileNotFound } from "../../errors/profile/ProfileNotFound"

type UpdateUserUseCaseResponse = Either<
  NotFoundException | ProfileNotFound,
  {
    token: string
    user: User
  }
>
export class UpdateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encrypterGateway: EncrypterGateway,
    private fetchClientProfile: FetchClientProfileUseCase,
  ) {}

  async execute(
    data: Partial<User>,
    userId: string,
    storeProfile?: string,
  ): Promise<UpdateUserUseCaseResponse> {
    const newUser = await this.userRepository.updateById(userId, data)
    if (!newUser) return left(new NotFoundException("Usuário não encontrado"))
    if (newUser.isStore === false) {
      const profile = await this.fetchClientProfile.execute(userId)
      if (profile.isLeft()) return left(profile.value)
      return right({
        token: this.encrypterGateway.encryptToken({
          id: newUser.id,
          name: newUser.name,
          isStore: newUser.isStore,
          permission: newUser.permission,
          profileId: profile.value.profile.id,
        }),
        user: newUser,
      })
    } else {
      return right({
        token: this.encrypterGateway.encryptToken({
          id: newUser.id,
          name: newUser.name,
          isStore: newUser.isStore,
          permission: newUser.permission,
          subscriptionPlanId: newUser.subscriptionPlanId,
          profileId: storeProfile,
        }),
        user: newUser,
      })
    }
  }
}
