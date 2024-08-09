import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { UserInfosDTO } from "src/domain/portal/application/dto/user-infos.dto"
import { EncrypterGateway } from "src/domain/portal/application/gateway/user/encrypter.gateway"
import { compare, genSalt, hash } from "bcryptjs"

@Injectable()
export class InfraCryptographyGateway implements EncrypterGateway {
  constructor(private jwtService: JwtService) {}

  encryptToken(payload: UserInfosDTO): string {
    return this.jwtService.sign(payload)
  }

  async encryptPassword(password: string): Promise<string> {
    const salt = await genSalt(10)
    const passwordhash = await hash(password, salt)
    return passwordhash
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash)
  }
}
