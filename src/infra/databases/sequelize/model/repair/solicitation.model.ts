import { AutoIncrement, Column, ForeignKey, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Form } from './form.model'

@Table({
  tableName: 'solicitations',
})
export class Solicitation extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number
  @Column
  fk_id_user:string
  @Column
  createdAt: string
  @Column
  updatedAt: string
  @Column
  status: string
  @ForeignKey(() => Form)
  @Column
  fk_id_form: number
  @HasOne(() => Form, {as: 'solicitation_form'})
  solicitation_form: Form
}