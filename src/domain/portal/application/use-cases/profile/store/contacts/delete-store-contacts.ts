import { Either, left, right } from "src/core/Either"
import { ActionNotAllowedError } from "@/domain/portal/application/errors/repair/solicitations/ActionNotAllowed"
import { BadRequestException } from "@nestjs/common"
import { IStoreContactsRepository } from "@/domain/portal/application/repositories/profile/store/store-contacts.repository"

type DeleteStoreContactsResponse = Either<
  ActionNotAllowedError | BadRequestException,
  null
>

export class DeleteStoreContactsUseCase {
  constructor(private storeContactsRepository: IStoreContactsRepository) {}

  async execute(
    contactId: string,
    storeProfileId: string,
  ): Promise<DeleteStoreContactsResponse> {
    const contact = await this.storeContactsRepository.findById(contactId)
    if (!contact) return left(new BadRequestException())
    if (contact.storeProfileId !== storeProfileId)
      return left(new ActionNotAllowedError())
    await this.storeContactsRepository.deleteById(contactId)
    return right(null)
  }
}
