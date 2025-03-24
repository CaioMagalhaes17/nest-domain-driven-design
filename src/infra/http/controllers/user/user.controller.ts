import { UpdateUserUseCase } from "@/domain/portal/application/use-cases/user/user-update-use-case"
import { User } from "@/domain/portal/enterprise/user/user"
import { JwtAuthGuard } from "@/infra/auth/guards/jwt.guard"
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import { InvalidCredentilsError } from "src/domain/portal/application/errors/user/invalid-credentials.error"
import { LoginInUseError } from "src/domain/portal/application/errors/user/login-in-use"
import { UserAuthLoginUseCase } from "src/domain/portal/application/use-cases/user/user-auth-login-use-case"
import { UserAuthSignUpUseCase } from "src/domain/portal/application/use-cases/user/user-auth-signup-use-case"

@Controller()
export class UserController {
  constructor(
    private userAuthLogin: UserAuthLoginUseCase,
    private userAuthSignUp: UserAuthSignUpUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private configService: ConfigService,
  ) {}
  @Post("/user/login")
  async login(
    @Body()
    loginData: {
      login: string
      password: string
      isStore: boolean
    },
  ) {
    const response = await this.userAuthLogin.execute(
      loginData.login,
      loginData.password,
      loginData.isStore,
    )
    if (response.isLeft()) {
      switch (response.value.constructor) {
        case InvalidCredentilsError:
          throw new BadRequestException(response.value.message)
        default:
          throw new BadRequestException()
      }
    }

    const { token, user } = response.value

    const userInfos = {
      id: user.id,
      name: user.name,
    }

    return {
      token,
      userInfos,
    }
  }

  @Post("/user")
  async signUp(
    @Body()
    signUpData: any,
  ) {
    console.log("321")
    const response = await this.userAuthSignUp.execute(signUpData)
    console.log("321bbbg")
    if (response.isLeft()) {
      switch (response.value.constructor) {
        case LoginInUseError:
          throw new BadRequestException(response.value.message)
        default:
          throw new BadRequestException()
      }
    }

    const { token, user } = response.value

    const userInfos = {
      id: user.id,
      name: user.name,
    }

    return {
      token,
      userInfos,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put("/user")
  async editUser(
    @Body() editBody: Partial<User>,
    @Req() req: { user: { id: string; profileId: string } },
  ) {
    const response = await this.updateUserUseCase.execute(
      editBody,
      req.user.id,
      req.user.profileId,
    )

    return response.value
  }

  @UseGuards(JwtAuthGuard)
  @Get("checkAuth")
  async execute(@Req() req: { user: { isStore: boolean } }) {
    console.log(
      this.configService.get<string>("IS_LOCAL"),
      this.configService.get<boolean>("IS_HML"),
    )
    return { response: "ok", isStore: req.user.isStore }
  }
}
