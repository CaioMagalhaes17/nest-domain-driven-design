import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"

@Table({
  tableName: "users",
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number
  @Column
  login: string
  @Column
  password: string
  @Column
  name: string
  @Column
  isStore: string
}
