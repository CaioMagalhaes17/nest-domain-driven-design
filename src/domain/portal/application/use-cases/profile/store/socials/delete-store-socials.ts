import { Either, left, right } from "src/core/Either"
import { IStoreSocialsRepository } from "@/domain/portal/application/repositories/profile/store/store-socials.repository"
import { ActionNotAllowedError } from "@/domain/portal/application/errors/repair/solicitations/ActionNotAllowed"
import { BadRequestException } from "@nestjs/common"

type DeleteStoreSocialsResponse = Either<
  ActionNotAllowedError | BadRequestException,
  null
>

export class DeleteStoreSocialsUseCase {
  constructor(private storeSocialsRepository: IStoreSocialsRepository) {}

  async execute(
    socialId: string,
    storeProfileId: string,
  ): Promise<DeleteStoreSocialsResponse> {
    const social = await this.storeSocialsRepository.findById(socialId)
    if (!social) return left(new BadRequestException())
    if (social.storeProfileId !== storeProfileId)
      return left(new ActionNotAllowedError())
    await this.storeSocialsRepository.deleteById(socialId)
    return right(null)
  }
}
