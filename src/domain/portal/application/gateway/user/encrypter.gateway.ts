import { UserInfosDTO } from "../../dto/user-infos.dto";

export abstract class EncrypterGateway {
  abstract encrypt(payload: UserInfosDTO) : string
}