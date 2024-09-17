import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"
import { User } from "../../user/user.model"

@Table({
  tableName: "company_profile",
})
export class CompanyProfile extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number
  @Column
  name: string
  @Column
  address: string
  @Column
  profile_img: string
  @Column
  rating: number
  @Column
  fk_id_geo_infos: number
  @Column
  bio: number
  @Column
  fk_id_type_subscription: number
  @ForeignKey(() => User)
  @Column
  fk_id_user: number
  @BelongsTo(() => User)
  user: User
}
