import { IsString } from "class-validator"

export class BudgetDTO {
  @IsString()
  readonly estimatedPrice: string

  @IsString()
  readonly solicitationId: string
}
