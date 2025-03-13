import { IStoreProfileRepository } from "../../../repositories/profile/store/store-profile.repository"
import { FetchGeolocationUseCase } from "../../geolocation/fetch-geolocation-use-case"

export class SearchStoreProfilesUseCase {
  constructor(
    private storeProfileRepository: IStoreProfileRepository,
    private fetchGeolocationUseCase: FetchGeolocationUseCase,
  ) {}

  async execute(query: string) {
    const profiles = await this.storeProfileRepository.search("name", query)
    if (profiles.length === 0) return []
    const teste = Promise.all(
      profiles.slice(0, 3).map(async (profile) => {
        const geolocation = await this.fetchGeolocationUseCase.execute(
          profile.id,
        )
        if (geolocation.isRight()) {
          return {
            profile,
            geolocation: geolocation.value[0],
          }
        }
        return { profile }
      }),
    )
    return teste
  }
}
