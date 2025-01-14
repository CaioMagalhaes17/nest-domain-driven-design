import { Either, right } from "src/core/Either"
import { User } from "src/domain/portal/enterprise/user/user"
import { IUserRepository } from "../../../repositories/user/user-repository.interface"
import { EncrypterGateway } from "../../../gateway/user/encrypter.gateway"
import { BadRequestException } from "@nestjs/common"

type UserAuthLoginUseCaseResponse = Either<
  BadRequestException,
  {
    token: string
    user: User
  }
>

export class SelectProfileUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encrypterGateway: EncrypterGateway,
  ) {}

  async execute({
    userId,
    storeProfileId,
  }: {
    userId: string
    storeProfileId: string
  }): Promise<UserAuthLoginUseCaseResponse> {
    const user = await this.userRepository.findById(userId)
    return right({
      token: this.encrypterGateway.encryptToken({
        id: user.id,
        name: user.name,
        isStore: user.isStore,
        permission: user.permission,
        profileId: storeProfileId,
        subscriptionPlanId: user.subscriptionPlanId,
      }),
      user,
    })
  }
}
