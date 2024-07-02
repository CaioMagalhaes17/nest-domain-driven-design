import { BaseEntity } from "src/core/entities/base-entity"

type BudgetProps = {
  userId: string
  estimatedPrice: string
  solicitationId: number
  status: string
}

export class Budget extends BaseEntity<BudgetProps> {
  static create(props: BudgetProps, id: number) {
    return new Budget(props, id)
  }

  get userId(): string {
    return this.props.userId
  }

  get estimatedPrice(): string {
    return this.props.estimatedPrice
  }

  get solicitationId(): number {
    return this.props.solicitationId
  }

  get status(): string {
    return this.props.status
  }
}
