import { BaseEntity } from "src/core/entities/base-entity";

type SolicitationProps = {
  name: string
}

export class Solicitation extends BaseEntity<SolicitationProps>{
  static create(props: SolicitationProps, id: Number){
    return new Solicitation(props, id)
  }

  get name(): string {
    return this.props.name
  }
}