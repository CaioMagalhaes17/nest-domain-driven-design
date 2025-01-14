import { User } from "@/domain/portal/enterprise/user/user"
import { EncrypterGateway } from "../../gateway/user/encrypter.gateway"
import { IUserRepository } from "../../repositories/user/user-repository.interface"
import { Either, left, right } from "@/core/Either"
import { NotFoundException } from "@nestjs/common"
import { IClientProfileRepository } from "../../repositories/profile/client/client-profile.repository"
import { IStoreProfileRepository } from "../../repositories/profile/store/store-profile.repository"

type UpdateUserUseCaseResponse = Either<
  NotFoundException,
  {
    token: string
    user: User
  }
>
export class UpdateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encrypterGateway: EncrypterGateway,
    private clientProfileRepository: IClientProfileRepository,
    private storeProfileRepository: IStoreProfileRepository,
  ) {}

  async execute(
    data: Partial<User>,
    userId: string,
    storeProfile?: string,
  ): Promise<UpdateUserUseCaseResponse> {
    const newUser = await this.userRepository.updateById(userId, data)
    if (!newUser) return left(new NotFoundException("Usuário não encontrado"))
    if (newUser.isStore === false) {
      const profile = await this.clientProfileRepository.findByParam<{
        userId: string
      }>({ userId })
      return right({
        token: this.encrypterGateway.encryptToken({
          id: newUser.id,
          name: newUser.name,
          isStore: newUser.isStore,
          permission: newUser.permission,
          profileId: profile[0].id,
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
