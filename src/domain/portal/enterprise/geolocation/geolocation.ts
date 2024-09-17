import { BaseEntity } from "src/core/entities/base-entity"

interface GeolocationProps {
  latitude: string
  longitude: string
  radius: string
  createdAt: string
  updatedAt: string
}

export class Geolocation extends BaseEntity<GeolocationProps> {
  static create(props: GeolocationProps, id: number) {
    return new Geolocation(props, id)
  }

  get latitude(): string {
    return this.props.latitude
  }

  get longitude(): string {
    return this.props.longitude
  }

  get radius(): string {
    return this.props.radius
  }

  get createdAt(): string {
    return this.props.createdAt
  }

  get updatedAt(): string {
    return this.props.updatedAt
  }
}
