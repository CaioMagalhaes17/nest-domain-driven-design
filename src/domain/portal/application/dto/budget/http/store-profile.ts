import { IsString } from "class-validator"

export class StoreProfileDTO {
  @IsString()
  readonly name: string

  @IsString()
  readonly address: string

  @IsString()
  readonly profileImg?: string

  @IsString()
  readonly description: string

  @IsString()
  readonly telNum: string

  @IsString()
  readonly email: string
}
