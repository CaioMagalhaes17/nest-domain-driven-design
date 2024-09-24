import { Either } from "src/core/Either"
import { ClientProfileRepository } from "../../repositories/profile/client/client-profile.repository"
import { ProfileActionNotAllowed } from "../../errors/profile/ProfileActionNotAllowed"
import { GeolocationRepository } from "../../repositories/geolocation/geolocation-repository"

type CreateGeolocationUseCaseResponse = Either<ProfileActionNotAllowed, number>

export interface MapRadiusPayload {
  latitude: string
  longitude: string
  radius?: string
}

export class CreateGeolocationUseCase {
  constructor(
    private geoLocationRepository: GeolocationRepository,
    private clientProfileRepository: ClientProfileRepository,
  ) {}

  async execute(
    mapRadiusPayload: MapRadiusPayload,
    user: { id: number; isStore: boolean },
  ): Promise<CreateGeolocationUseCaseResponse> {
    const id = await this.geoLocationRepository.create({
      typeProfile: !user.isStore ? "client" : "store",
      userId: user.id,
      ...mapRadiusPayload,
    })
    await this.clientProfileRepository.editProfile(
      { preferredMapRadiusId: id },
      user.id,
    )
    return id
  }
}
