import { BadRequestException, Body, Controller, Post, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Either, Left, Right } from "src/core/Either";
import { UserInfosDTO } from "src/domain/portal/application/dto/user-infos.dto";
import { UserSignUpDTO } from "src/domain/portal/application/dto/user-signup.dto";
import { InvalidCredentilsError } from "src/domain/portal/application/errors/user/invalid-credentials.error";
import { LoginInUseError } from "src/domain/portal/application/errors/user/login-in-use";
import { UserAuthLoginUseCase } from "src/domain/portal/application/use-cases/user/user-auth-login-use-case";
import { UserAuthSignUpUseCase } from "src/domain/portal/application/use-cases/user/user-auth-signup-use-case";

@Controller()
export class UserController {
  constructor(private userAuthLogin: UserAuthLoginUseCase, private userAuthSignUp: UserAuthSignUpUseCase) {}
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

  @Post('/user')
  async signUp(@Body() signUpData: Partial<UserSignUpDTO>) {
    const response = await this.userAuthSignUp.execute({login: signUpData.login, name: signUpData.name, password: signUpData.password})
    if (response.isLeft()){
      switch (response.value.constructor) {
        case LoginInUseError:
          throw new BadRequestException(response.value.message)
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