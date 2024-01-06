import { SetMetadata } from '@nestjs/common';

import { OtpActionEnum } from '../enums/otp-action.enum';

export const OTP_ACTION = 'otpAction';
export const OtpAction = (action: OtpActionEnum) =>
  SetMetadata(OTP_ACTION, action);
