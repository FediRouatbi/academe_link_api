import { OtpActionEnum } from '../enums/otp-action.enum';

export interface IOtpTokenPayload {
  sub: number;
  act: OtpActionEnum;
  oh: string;
}
