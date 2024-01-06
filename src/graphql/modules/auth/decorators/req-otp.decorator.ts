import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { OtpActionEnum } from '../enums/otp-action.enum';

export const ReqOtp = createParamDecorator(
  (
    data: string,
    ctx: ExecutionContext,
  ): { otpHash: string; otpAction: OtpActionEnum } => {
    const GqlCtx = GqlExecutionContext.create(ctx);
    const {
      otpHash,
      otpAction,
    }: { otpHash: string; otpAction: OtpActionEnum } = GqlCtx.getArgs();
    return data
      ? { otpAction: otpAction[data], otpHash: otpHash[data] }
      : { otpAction, otpHash };
  },
);
