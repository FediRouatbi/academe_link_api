import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { MailTemplateEnum } from '../enums/mail-template.enum';

import { ISendEmailValidationOtp } from '../interfaces/send-email-validation-otp.interface copy';
import { ISendMail } from '../interfaces/send-mail.interface';
import { ISendResetPasswordOtp } from '../interfaces/send-reset-password-otp.interface';
import { ISendTwoFactorAuthOtp } from '../interfaces/send-two-factor-auth-otp.interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  // async onModuleInit() {
  //   await this.send({
  //     subject: 'test email',
  //     template: MailTemplateEnum.WELCOME,
  //     to: 'souhail.sboui@astrolab-agency.com',
  //     context: {
  //       message: 'i hope this works!',
  //     },
  //   });
  // }

  async send(sendMailDto: ISendMail) {
    try {
      await this.mailerService.sendMail(sendMailDto);
    } catch (error) {
      console.log(error);
    }
  }

  async sendResetPasswordOtp(sendResetPasswordOtp: ISendResetPasswordOtp) {
    const { to, otp } = sendResetPasswordOtp;
    this.send({
      subject: 'Reset Password OTP',
      template: MailTemplateEnum.RESET_PASSWORD_OTP,
      context: { otp },
      to,
    });
  }

  async sendTwoFactorAuthOtp(sendTwoFactorAuthOtp: ISendTwoFactorAuthOtp) {
    const { to, otp } = sendTwoFactorAuthOtp;
    this.send({
      subject: '2FA OTP',
      template: MailTemplateEnum.TWO_FACTOR_AUTH_OTP,
      context: { otp },
      to,
    });
  }

  async sendEmailValidationOtp(
    sendEmailValidationOtp: ISendEmailValidationOtp,
  ) {
    const { to, otp } = sendEmailValidationOtp;
    this.send({
      subject: 'Email validation OTP',
      template: MailTemplateEnum.EMAIL_VALIDTION_OTP,
      context: { otp },
      to,
    });
  }
}
