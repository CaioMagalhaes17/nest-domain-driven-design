export class BaseEntity<T> {
  private id: Number
  protected props: T

  protected constructor(props: T, id?: Number){
    this.props = props
    this.id = id
  }
}