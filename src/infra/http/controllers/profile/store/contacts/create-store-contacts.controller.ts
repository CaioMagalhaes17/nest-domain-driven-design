import { StoreContactsDTO } from "@/domain/portal/application/dto/store-contacts.dto"
import { ActionNotAllowedError } from "@/domain/portal/application/errors/repair/solicitations/ActionNotAllowed"
import { CreateStoreContactsUseCase } from "@/domain/portal/application/use-cases/profile/store/contacts/create-store-contacts"
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class CreateStoreContactsUseCaseController {
  constructor(private createStoreContactsUseCase: CreateStoreContactsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/profile/contacts")
  async handle(
    @Req()
    req: { user: { profileId: string } },
    @Body() createStoreContacts: StoreContactsDTO,
  ) {
    const response = await this.createStoreContactsUseCase.execute(
      req.user.profileId,
      createStoreContacts,
    )

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case ActionNotAllowedError:
          throw new BadRequestException("Limite de contatos atingido!")
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }
  }
}
