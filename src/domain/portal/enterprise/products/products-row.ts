import { BaseEntity } from "src/core/entities/base-entity"

interface ProductsRowProps {
  name: string
  storeProfileId: string
  isActive: boolean
  updatedAt: string
  createdAt: string
}

export class ProductsRow extends BaseEntity<ProductsRowProps> {
  static create(props: ProductsRowProps, id: string) {
    return new ProductsRow(props, id)
  }

  get storeProfileId(): string {
    return this.props.storeProfileId
  }

  get name(): string {
    return this.props.name
  }

  get isActive(): boolean {
    return this.props.isActive
  }

  get createdAt(): string {
    return this.props.createdAt
  }

  get updatedAt(): string {
    return this.props.updatedAt
  }
}
