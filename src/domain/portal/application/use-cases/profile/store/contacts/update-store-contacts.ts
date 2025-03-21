import { Either, left, right } from "src/core/Either"
import { ActionNotAllowedError } from "@/domain/portal/application/errors/repair/solicitations/ActionNotAllowed"
import { BadRequestException } from "@nestjs/common"
import { IStoreContactsRepository } from "@/domain/portal/application/repositories/profile/store/store-contacts.repository"
import { StoreContacts } from "@/domain/portal/enterprise/profile/store/store-contacts"

type FetchStoreContactsResponse = Either<
  ActionNotAllowedError | BadRequestException,
  null
>

export class UpdateStoreContactsUseCase {
  constructor(private storeContactsRepository: IStoreContactsRepository) {}

  async execute(
    storeProfileId: string,
    updateData: Partial<StoreContacts>,
  ): Promise<FetchStoreContactsResponse> {
    const contact = await this.storeContactsRepository.findByParam<{
      storeProfileId: string
    }>({ storeProfileId })
    if (!contact) return left(new BadRequestException())

    await this.storeContactsRepository.updateById(contact[0].id, updateData)
    return right(null)
  }
}
