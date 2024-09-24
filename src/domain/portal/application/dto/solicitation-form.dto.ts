import { IsBoolean, IsString } from "class-validator"

export class SolicitationFormDTO {
  @IsString()
  readonly brand: string

  @IsString()
  readonly model: string

  @IsString()
  readonly imeiNumber: string

  @IsString()
  readonly usageTime: string

  @IsString()
  readonly problemDescription: string

  @IsString()
  readonly problemCause: string

  @IsString()
  readonly previousRepair: string

  @IsBoolean()
  readonly originalHardware: boolean
}
