import { BaseEntity } from "src/core/entities/base-entity"

interface ProductProps {
  name: string
  storeProfileId: string
  isActive: boolean
  description: string
  category: string
  productImg: string
  rowId: string
  price: string
}

export class Product extends BaseEntity<ProductProps> {
  static create(props: ProductProps, id: string) {
    return new Product(props, id)
  }

  get storeProfileId(): string {
    return this.props.storeProfileId
  }

  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  get category(): string {
    return this.props.category
  }

  get productImg(): string {
    return this.props.productImg
  }

  get price(): string {
    return this.props.price
  }

  get isActive(): boolean {
    return this.props.isActive
  }
}
