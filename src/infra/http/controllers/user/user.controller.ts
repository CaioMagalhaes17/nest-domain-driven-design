import { BadRequestException, Body, Controller, Post, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Either, Left, Right } from "src/core/Either";
import { UserInfosDTO } from "src/domain/portal/application/dto/user-infos.dto";
import { InvalidCredentilsError } from "src/domain/portal/application/errors/user/invalid-credentials.error";
import { UserAuthLoginUseCase } from "src/domain/portal/application/use-cases/user/user-auth-login-use-case";

@Controller()
export class UserController {
  constructor(private userAuthLogin: UserAuthLoginUseCase) {}
  @Post('/login')
  async login(@Body() loginData: Partial<{login: string, password: string}>){
    const response = await this.userAuthLogin.execute(loginData.login, loginData.password)
    if (response.isLeft()){
      switch (response.value.constructor) {
        case InvalidCredentilsError:
          throw new UnauthorizedException(response.value.message)
        default:
          throw new BadRequestException()
      }
    }
    
    const {token, user} = response.value

    const userInfos: UserInfosDTO = {
      id: user.id,
      name: user.name
    } 

    return {
      token,
      userInfos
    }
  }
}