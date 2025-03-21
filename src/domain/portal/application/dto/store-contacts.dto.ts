import { IsBoolean, IsOptional, IsString } from "class-validator"

export class StoreContactsDTO {
  @IsOptional()
  @IsString()
  readonly email?: string

  @IsOptional()
  @IsString()
  readonly telNum?: string

  @IsString()
  readonly description: string

  @IsBoolean()
  readonly main: boolean

  @IsString()
  readonly wppNum: string
}
