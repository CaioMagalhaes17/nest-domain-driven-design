import { Either, right } from "src/core/Either"
import { StoreContacts } from "@/domain/portal/enterprise/profile/store/store-contacts"
import { IStoreContactsRepository } from "@/domain/portal/application/repositories/profile/store/store-contacts.repository"

type FetchStoreSocialsResponse = Either<null, StoreContacts[]>

export class FetchStoreContactsUseCase {
  constructor(private storeContactsRepository: IStoreContactsRepository) {}

  async execute(storeProfileId: string): Promise<FetchStoreSocialsResponse> {
    const contacts = await this.storeContactsRepository.findByParam<{
      storeProfileId: string
    }>({
      storeProfileId,
    })
    return right(contacts)
  }
}
