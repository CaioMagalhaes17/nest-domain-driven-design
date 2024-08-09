import { UserInfosDTO } from "../../dto/user-infos.dto"

export abstract class EncrypterGateway {
  abstract encryptToken(payload: UserInfosDTO): string
  abstract encryptPassword(password: string): Promise<string>
  abstract comparePassword(password: string, hash: string): Promise<boolean>
}
