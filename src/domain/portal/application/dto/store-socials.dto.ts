import { IsString } from "class-validator"

export class StoreSocialsDTO {
  @IsString()
  readonly type: string

  @IsString()
  readonly link: string
}
