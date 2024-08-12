import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"

@Table({
  tableName: "client_profile",
})
export class ClientProfile extends Model {
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
  fk_id_map_radius: number
  @Column
  fk_id_user: number
}
