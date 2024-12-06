import { Module } from "@nestjs/common"
import { UserDatabaseModule } from "./user-database.module"

@Module({
  imports: [UserDatabaseModule],

  exports: [UserDatabaseModule],
})
export class DataBaseModule {}
