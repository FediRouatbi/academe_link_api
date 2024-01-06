import { FastifyRequest } from 'fastify';



import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';



import { AuthService } from '../services/auth.service';



import { GqlException } from '@src/common/utils/gql-exception.util';



import { ROLES_KEY } from '../decorators/roles.decorator';
import { SKIP_AUTH_KEY } from '../decorators/skip-auth.decorator';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const skipAuth = this.reflector.getAllAndOverride<boolean>(
        SKIP_AUTH_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (skipAuth) {
        return true;
      }

      const acceptedRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      const GqlCtx = GqlExecutionContext.create(context);
      const req: FastifyRequest = GqlCtx.getContext().req;

      const token = this.extractTokenFromHeader(req);

      if (!token) {
        throw new GqlException('401.483109');
      }

      const { user } = await this.authService.validateToken(
        token,
        acceptedRoles,
      );
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