import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { SequelizeConfigService } from './databases/sequelize/sequelize-config.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';


@Module({
  imports: [
    HttpModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
})
export class AppModule {}
