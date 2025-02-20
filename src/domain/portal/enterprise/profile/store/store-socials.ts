import { BaseEntity } from "src/core/entities/base-entity"
import { StoreProfile } from "./store-profile"

type StoreSocialsProps = {
  type: string
  link: string
  storeProfileId: string
  storeProfile: StoreProfile
}

export class StoreSocials extends BaseEntity<StoreSocialsProps> {
  static create(props: StoreSocialsProps, id: string) {
    return new StoreSocials(props, id)
  }

  get type(): string {
    return this.props.type
  }

  get link(): string {
    return this.props.link
  }

  get storeProfile(): StoreProfile {
    return this.props.storeProfile
  }

  get storeProfileId(): string {
    return this.props.storeProfileId
  }
}
