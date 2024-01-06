import { FastifyRequest } from 'fastify';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AuthService } from '../services/auth.service';

import { GqlException } from '@src/common/utils/gql-exception.util';

import { OTP_ACTION } from '../decorators/otp-action.decorator';

import { OtpActionEnum } from '../enums/otp-action.enum';

@Injectable()
export class OtpActionValidationGuard implements CanActivate {
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

      const GqlCtx = GqlExecutionContext.create(context);
      const req: FastifyRequest = GqlCtx.getContext().req;

      const token = this.extractTokenFromHeader(req);

      if (!token) {
        throw new GqlException('401.483109');
      }

      const user = await this.authService.validateOtpActionToken(token, action);
      const args = GqlCtx.getArgs();
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
