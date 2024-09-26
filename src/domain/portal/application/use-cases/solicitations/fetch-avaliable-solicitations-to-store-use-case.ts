import { FetchGeolocationCoveringStoreUseCase } from "../geolocation/fetch-geolocation-covering-use-case"
import { FetchGeolocationUseCase } from "../geolocation/fetch-geolocation-use-case"
import { FetchUserSolicitationsUseCase } from "./fetch-user-solicitations-use-case"

export class FetchAvaliableSolicitationsToStoreUseCase {
  constructor(
    private fetchGeolocationCoveringStoreUseCase: FetchGeolocationCoveringStoreUseCase,
    private fetchGeolocationUseCase: FetchGeolocationUseCase,
    private fetchUserSolicitationsUseCase: FetchUserSolicitationsUseCase,
  ) {}

  async execute(userId: number) {
    const storeGeolocation = await this.fetchGeolocationUseCase.execute(userId)
    if (storeGeolocation.isRight()) {
      const covering = await this.fetchGeolocationCoveringStoreUseCase.execute({
        latitude: storeGeolocation.value.geolocation.latitude,
        longitude: storeGeolocation.value.geolocation.longitude,
      })

      // const usersSolicitations = await Promise.all(
      //   covering.map(async (client, index) => {
      //     const usersSolicitations =
      //       await this.fetchUserSolicitationsUseCase.execute(client.fk_id_user)
      //     return usersSolicitations
      //   }),
      // )

      // console.log(usersSolicitations)
      return covering
    }
  }
}
