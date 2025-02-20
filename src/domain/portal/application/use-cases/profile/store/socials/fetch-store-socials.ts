import { Either, right } from "src/core/Either"
import { IStoreSocialsRepository } from "@/domain/portal/application/repositories/profile/store/store-socials.repository"
import { StoreSocials } from "@/domain/portal/enterprise/profile/store/store-socials"

type FetchStoreSocialsResponse = Either<null, StoreSocials[]>

export class FetchStoreSocialsUseCase {
  constructor(private storeSocialsRepository: IStoreSocialsRepository) {}

  async execute(storeProfileId: string): Promise<FetchStoreSocialsResponse> {
    const socials = await this.storeSocialsRepository.findByParam<{
      storeProfileId: string
    }>({
      storeProfileId,
    })
    return right(socials)
  }
}
