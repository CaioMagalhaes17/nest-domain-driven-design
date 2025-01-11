import { BaseEntity } from "src/core/entities/base-entity"

interface GeolocationProps {
  latitude: number
  longitude: number
  radius: number
  profileId: string
}

export class Geolocation extends BaseEntity<GeolocationProps> {
  static create(props: GeolocationProps, id: string) {
    return new Geolocation(props, id)
  }

  get latitude(): number {
    return this.props.latitude
  }

  get longitude(): number {
    return this.props.longitude
  }

  get radius(): number {
    return this.props.radius
  }

  get profileId(): string {
    return this.props.profileId
  }
}
