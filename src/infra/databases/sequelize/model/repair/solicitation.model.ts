import {
  AutoIncrement,
  Column,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"
import { SolicitationForm } from "./form.model"

@Table({
  tableName: "solicitations",
})
export class Solicitation extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number
  @Column
  fk_id_user: string
  @Column
  status: string
  @ForeignKey(() => SolicitationForm)
  @Column
  fk_id_form: number
  @HasOne(() => SolicitationForm, { as: "solicitation_form" })
  solicitation_form: SolicitationForm
}
