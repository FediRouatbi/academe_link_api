import { OtpActionEnum } from '../enums/otp-action.enum';

export interface IOtpActionTokenPayload {
  sub: number;
  act: OtpActionEnum;
}
