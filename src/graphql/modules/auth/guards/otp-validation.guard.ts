import { FastifyRequest } from 'fastify';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AuthService } from '../services/auth.service';

import { GqlException } from '@src/common/utils/gql-exception.util';

import { OTP_ACTION } from '../decorators/otp-action.decorator';
import { SKIP_TOKEN_EXPIRATION } from '../decorators/skip-otp.decorator';

import { OtpActionEnum } from '../enums/otp-action.enum';

@Injectable()
export class OtpValidationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const action = this.reflector.getAllAndOverride<OtpActionEnum>(
        OTP_ACTION,
        [context.getHandler(), context.getClass()],
      );

      const skipTokenExpiration = this.reflector.getAllAndOverride<boolean>(
        SKIP_TOKEN_EXPIRATION,
        [context.getHandler(), context.getClass()],
      );

      const GqlCtx = GqlExecutionContext.create(context);
      const req: FastifyRequest = GqlCtx.getContext().req;

      const token = this.extractTokenFromHeader(req);

      if (!token) {
        throw new GqlException('401.483109');
      }

      const { user, payload } = await this.authService.validateOtpToken(
        token,
        action,
        skipTokenExpiration,
      );

      const args = GqlCtx.getArgs();

      args.otpAction = payload.act;
      args.otpHash = payload.oh;
      args.user = user;
      return true;
    } catch (error) {
      throw error;
    }
  }

  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
