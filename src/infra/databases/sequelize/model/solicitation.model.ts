import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table({
  tableName: 'solicitations',
  timestamps: false
})
export class Solicitation extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: Number

  @Column
  name: string
}