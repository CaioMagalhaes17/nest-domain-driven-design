import {
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common"
import { BaseDomainUseCase } from "../domain/base.use-case"
import { JwtAuthGuard } from "@/infra/auth/guards/jwt.guard"

export abstract class BaseInfraUseCaseController<DomainModel> {
  constructor(protected readonly useCase: BaseDomainUseCase<DomainModel>) {}

  @UseGuards(JwtAuthGuard)
  @Post("")
  async create(
    data: Partial<DomainModel>,
    @Req() req: { user: { permission: string } },
  ): Promise<{ id: string }> {
    if (req.user.permission === "ADMIN") {
      return this.useCase.create(data)
    }
    throw new UnauthorizedException("Ação não permitida")
  }

  @UseGuards(JwtAuthGuard)
  @Get("")
  async findAll(
    @Req() req: { user: { permission: string } },
  ): Promise<DomainModel[]> {
    if (req.user.permission === "ADMIN") {
      return this.useCase.findAll()
    }
    throw new UnauthorizedException("Ação não permitida")
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findById(
    @Param("id") id: string,
    @Req() req: { user: { permission: string } },
  ): Promise<DomainModel | null> {
    if (req.user.permission === "ADMIN") {
      return this.useCase.findById(id)
    }
    throw new UnauthorizedException("Ação não permitida")
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updateById(
    id: string,
    updateData: Partial<DomainModel>,
    @Req() req: { user: { permission: string } },
  ): Promise<DomainModel | null> {
    if (req.user.permission === "ADMIN") {
      return this.useCase.updateById(id, updateData)
    }
    throw new UnauthorizedException("Ação não permitida")
  }

  @UseGuards(JwtAuthGuard)
  @Delete("deleteAll")
  async deleteAll(@Req() req: { user: { permission: string } }): Promise<void> {
    if (req.user.permission === "ADMIN") {
      return this.useCase.deleteAll()
    }
    throw new UnauthorizedException("Ação não permitida")
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteById(
    id: string,
    @Req() req: { user: { permission: string } },
  ): Promise<void> {
    if (req.user.permission === "ADMIN") {
      return this.useCase.deleteById(id)
    }
    throw new UnauthorizedException("Ação não permitida")
  }
}
