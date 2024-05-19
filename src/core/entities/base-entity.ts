export class BaseEntity<T> {
  private _id: Number
  protected props: T

  get id() {
    return this._id
  }

  protected constructor(props: T, id?: Number){
    this.props = props
    this._id = id
  }
}