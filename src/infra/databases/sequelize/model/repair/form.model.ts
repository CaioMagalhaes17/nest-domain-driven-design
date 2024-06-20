import { AutoIncrement, BelongsTo, Column, DefaultScope, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Solicitation } from './solicitation.model'

@Table({
  tableName: 'solicitation_form',
  timestamps: false
})
export class Form extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number
  @Column
  brand: string
  @Column
  model: string
  @Column
  imei_num: string
  @Column
  usage_time: string
  @Column
  problem_desc: string
  @Column
  problem_cause: string
  @Column
  previous_repair: string
  @Column
  original_hardware: string
  @ForeignKey(() => Solicitation)
  @Column
  fk_id_solicitation: number
  @BelongsTo(() => Solicitation)
  solicitation: Solicitation;
}