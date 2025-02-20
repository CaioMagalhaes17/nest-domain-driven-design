import { BaseEntity } from "src/core/entities/base-entity"
import { StoreProfile } from "./store-profile"

type StoreContactsProps = {
  email?: string
  telNum?: string
  description: string
  main: boolean
  storeProfileId: string
  storeProfile: StoreProfile
}

export class StoreContacts extends BaseEntity<StoreContactsProps> {
  static create(props: StoreContactsProps, id: string) {
    return new StoreContacts(props, id)
  }

  get main(): boolean {
    return this.props.main
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
}
