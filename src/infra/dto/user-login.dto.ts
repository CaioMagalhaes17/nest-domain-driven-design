import { IsString, MinLength } from "class-validator"

export class UserLoginDTO {
  @IsString()
  login: string

  @IsString()
  @MinLength(8)
  password: string
}
