import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./stategies/jwt-strategy";
import { DataBaseModule } from "../databases/database.module";


@Module({
  imports: [
    DataBaseModule,
    JwtModule.register({
      secret: 'asdasd',
      signOptions: { expiresIn: '10min' },
    })
  ],
  providers: [JwtStrategy],
  exports: [JwtModule, JwtStrategy]  
})

export class AuthModule {}