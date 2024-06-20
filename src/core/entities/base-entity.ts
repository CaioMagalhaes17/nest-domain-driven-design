export class BaseEntity<T> {
  private _id: number
  protected props: T

  get id() {
    return this._id
  }

  protected constructor(props: T, id?: number){
    this.props = props
    this._id = id
  }
}