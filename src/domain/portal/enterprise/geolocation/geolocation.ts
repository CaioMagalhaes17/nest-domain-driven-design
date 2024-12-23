import { BaseEntity } from "src/core/entities/base-entity"

interface GeolocationProps {
  latitude: string
  longitude: string
  radius: string
  createdAt: string
  updatedAt: string
  typeProfile: string
  userId: number
}

export class Geolocation extends BaseEntity<GeolocationProps> {
  static create(props: GeolocationProps, id: string) {
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

  get typeProfile(): string {
    return this.props.typeProfile
  }

  get userId(): number {
    return this.props.userId
  }
}
