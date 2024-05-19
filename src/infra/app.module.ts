import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { SequelizeModule } from '@nestjs/sequelize'
import { SequelizeConfigService } from './databases/sequelize/sequelize-config.service';


@Module({
  imports: [HttpModule, SequelizeConfigService],
  providers: [],
})
export class AppModule {}
