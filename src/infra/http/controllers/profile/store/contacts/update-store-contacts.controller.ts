import { StoreContactsDTO } from "@/domain/portal/application/dto/store-contacts.dto"
import { ActionNotAllowedError } from "@/domain/portal/application/errors/repair/solicitations/ActionNotAllowed"
import { UpdateStoreContactsUseCase } from "@/domain/portal/application/use-cases/profile/store/contacts/update-store-contacts"
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class UpdateStoreContactsUseCaseController {
  constructor(private updateStoreContactsUseCase: UpdateStoreContactsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Put("/profile/contacts")
  async handle(
    @Req()
    req: { user: { profileId: string } },
    @Body() updateStoreContacts: Partial<StoreContactsDTO>,
  ) {
    const response = await this.updateStoreContactsUseCase.execute(
      req.user.profileId,
      updateStoreContacts,
    )

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case ActionNotAllowedError:
          throw new BadRequestException(response.value.message)
        case BadRequestException:
          throw new BadRequestException("Rede social não encontrada!")
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }
  }
}
