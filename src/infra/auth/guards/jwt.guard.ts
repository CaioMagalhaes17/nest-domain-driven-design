import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Executa a lógica padrão da guarda
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      //throw err || new UnauthorizedException();
    }

    return user;
  }
}