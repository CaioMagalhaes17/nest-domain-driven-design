import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserInfosDTO } from "src/domain/portal/application/dto/user-infos.dto";
import { EncrypterGateway } from "src/domain/portal/application/gateway/user/encrypter.gateway";

@Injectable()
export class InfraCryptographyGateway implements EncrypterGateway {
  constructor(private jwtService: JwtService) {}

  encrypt(payload: UserInfosDTO) : string {
    return this.jwtService.sign(payload)
  }
}