import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"

@Table({
  tableName: "geo_infos",
})
export class Geolocation extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number
  @Column
  latitude: string
  @Column
  longitude: string
  @Column
  radius: string
  @Column
  type_profile: string
  @Column
  fk_id_user: number
}
