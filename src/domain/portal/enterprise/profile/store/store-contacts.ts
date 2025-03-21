import { BaseEntity } from "src/core/entities/base-entity"
import { StoreProfile } from "./store-profile"

type StoreContactsProps = {
  email?: string
  telNum?: string
  description: string
  storeProfileId: string
  storeProfile: StoreProfile
  wppNum: string
}

export class StoreContacts extends BaseEntity<StoreContactsProps> {
  static create(props: StoreContactsProps, id: string) {
    return new StoreContacts(props, id)
  }

  get storeProfileId(): string {
    return this.props.storeProfileId
  }

  get storeProfile(): StoreProfile {
    return this.props.storeProfile
  }

  get description(): string {
    return this.props.description
  }

  get email(): string {
    return this.props.email
  }

  get telNum(): string {
    return this.props.telNum
  }

  get wppNum(): string {
    return this.props.wppNum
  }
}
