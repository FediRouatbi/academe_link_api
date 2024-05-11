import { Prisma, user } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { SignupInput } from '../dto/signup.input';
import { Token } from '../models/token.model';
import { PrismaService } from 'src/common/services/prisma.service';
import { ConfigService } from '@nestjs/config';
import { UpdateUser } from '../dto/update.input';

export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(payload: SignupInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword('123456');
    const { role, ...rest } = payload;
    try {
      const user = await this.prisma.user.create({
        data: {
          ...rest,
          password_hash: hashedPassword,
          roles_on_users: {
            create: {
              status: 'ACTIVE',
              role: { connect: { role_code: role } },
            },
          },
        },
      });

      return this.generateTokens({
        user_id: user.user_id.toString(),
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${payload.email} already used.`);
      }
      throw new Error(e);
    }
  }

  async editUser(payload: UpdateUser) {
    const { password, user_id, ...rest } = payload;
    let hashedPassword: string;
    if (password) {
      hashedPassword = await this.passwordService.hashPassword(password);
    }
    try {
      const user = await this.prisma.user.update({
        where: { user_id },
        data: {
          ...rest,
          ...(hashedPassword && { password_hash: hashedPassword }),
        },
      });

      return user;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${payload.email} already used.`);
      }
      throw new Error(e);
    }
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password_hash,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({
      user_id: user.user_id.toString(),
    });
  }

  validateUser(user_id: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: { user_id: +user_id },
      include: {
        roles_on_users: { select: { role: { select: { role_code: true } } } },
      },
    });
  }

  getUserFromToken(token: string): Promise<user> {
    const user_id = this.jwtService.decode(token)['user_id'];
    return this.prisma.user.findUnique({ where: { user_id: +user_id } });
  }

  generateTokens(payload: { user_id: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { user_id: string }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { user_id: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: 8000000,
    });
  }

  refreshToken(token: string) {
    try {
      const { user_id } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        user_id,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
