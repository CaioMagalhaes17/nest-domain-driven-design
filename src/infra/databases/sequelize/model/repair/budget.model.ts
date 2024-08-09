import {
  AutoIncrement,
  Column,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"
import { Solicitation } from "./solicitation.model"

@Table({
  tableName: "budget",
})
export class Budget extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number
  @Column
  estimated_price: string
  @Column
  status: string
  @Column
  fk_id_user: number
  @ForeignKey(() => Solicitation)
  @Column
  fk_id_solicitation: number
}
