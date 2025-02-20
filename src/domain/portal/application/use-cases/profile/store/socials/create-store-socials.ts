import { Either, left } from "@/core/Either"
import { StoreSocialsDTO } from "@/domain/portal/application/dto/store-socials.dto"
import { IStoreSocialsRepository } from "@/domain/portal/application/repositories/profile/store/store-socials.repository"
import { BadRequestException } from "@nestjs/common"

type FetchStoreSocialsUseCaseResponse = Either<BadRequestException, null>

export class CreateStoreSocialsUseCase {
  constructor(private storeSocialsRepository: IStoreSocialsRepository) {}

  async execute(
    storeProfileId: string,
    socialsCreateData: StoreSocialsDTO,
  ): Promise<FetchStoreSocialsUseCaseResponse> {
    const socials = await this.storeSocialsRepository.findByParam<{
      storeProfileId: string
    }>({
      storeProfileId,
    })
    if (socials.length > 0) {
      const sameType = socials.find(
        (item) => item.type === socialsCreateData.type,
      )
      if (sameType) return left(new BadRequestException())
    }
    await this.storeSocialsRepository.create({
      storeProfileId,
      ...socialsCreateData,
    })
  }
}
