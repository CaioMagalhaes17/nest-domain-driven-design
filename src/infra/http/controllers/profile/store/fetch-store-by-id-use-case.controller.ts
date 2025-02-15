import { FetchStoreProfileByIdUseCase } from "@/domain/portal/application/use-cases/profile/store/fetch-store-by-id"
import { StoreProfilePresenter } from "@/infra/presenters/profile/store/store-profile.presenter"
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from "@nestjs/common"
import { ProfileNotFound } from "src/domain/portal/application/errors/profile/ProfileNotFound"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchStoreProfileByIdUseCaseController {
  constructor(private fetchStoreProfileUseCase: FetchStoreProfileByIdUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/profile/store/:id")
  async handle(@Param("id") id: string) {
    const response = await this.fetchStoreProfileUseCase.execute(id)

    if (response.isLeft()) {
      switch (response.value.constructor) {
        case ProfileNotFound:
          throw new NotFoundException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    return StoreProfilePresenter.toHttp(
      response.value.profile,
      response.value.location,
    )
  }
}
