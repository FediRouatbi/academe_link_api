import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { user as UserModel } from '@prisma/client';

export const ReqUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): UserModel => {
    const GqlCtx = GqlExecutionContext.create(ctx);
    const { user }: { user: UserModel } = GqlCtx.getArgs();
    return data ? user[data] : user;
  },
);
