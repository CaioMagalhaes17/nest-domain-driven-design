import { IsNumber, IsString } from "class-validator"

export class BudgetDTO {
  @IsString()
  readonly estimatedPrice: string

  @IsNumber()
  readonly solicitationId: string
}
