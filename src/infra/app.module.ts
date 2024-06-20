import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { SequelizeConfigService } from './databases/sequelize/sequelize-config.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [HttpModule, SequelizeConfigService],
})
export class AppModule {}
