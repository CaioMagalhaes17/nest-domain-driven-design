import {
  AutoIncrement,
  Column,
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

  @HasOne(() => SolicitationForm)
  solicitation_form: SolicitationForm
}
