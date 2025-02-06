import { IsString } from "class-validator"

export class BudgetDTO {
  @IsString()
  readonly startValue: string

  @IsString()
  readonly endValue: string

  @IsString()
  readonly details: string

  @IsString()
  readonly solicitationId: string
}
