import { IStoreContactsRepository } from "@/domain/portal/application/repositories/profile/store/store-contacts.repository"

export class FetchStoreContactsUseCase {
  constructor(private storeContactsRepository: IStoreContactsRepository) {}

  async execute(storeProfileId: string) {
    const contacts = await this.storeContactsRepository.findByParam<{
      storeProfileId: string
    }>({
      storeProfileId,
    })
    if (contacts.length === 0) return null
    return contacts[0]
  }
}
