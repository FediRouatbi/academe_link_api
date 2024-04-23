import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RoleCodeEnum, user } from '@prisma/client';
import { AuthService } from './services/auth.service';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: JwtDto): Promise<user & { role: RoleCodeEnum }> {
    const user = await this.authService.validateUser(payload?.user_id);
    const { roles_on_users, ...rest } = user;
    const role = user?.roles_on_users?.[0]?.role?.role_code as RoleCodeEnum;
    if (!user) {
      throw new UnauthorizedException();
    }
    return { ...rest, role };
  }
}
