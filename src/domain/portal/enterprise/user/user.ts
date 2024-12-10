import { BaseEntity } from "src/core/entities/base-entity"

type UserProps = {
  createdAt: string
  updatedAt: string
  login: string
  password: string
  name: string
  isStore: boolean
  permission: string
}

export class User extends BaseEntity<UserProps> {
  static create(props: UserProps, id: number) {
    return new User(props, id)
  }

  get createdAt(): string {
    return this.props.createdAt
  }

  get updatedAt(): string {
    return this.props.updatedAt
  }

  get login(): string {
    return this.props.login
  }

  get password(): string {
    return this.props.password
  }

  get name(): string {
    return this.props.name
  }

  get isStore(): boolean {
    return this.props.isStore
  }

  get permission(): string {
    return this.props.permission
  }
}
