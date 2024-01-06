import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { email as EmailModel, user as UserModel } from '@prisma/client';

import { AppConfigService } from '@src/common/services/app-config.service';
import { BcryptService } from '@src/common/services/bcrypt.service';
import { DateService } from '@src/common/services/date.service';
import { MailService } from '@src/common/services/mail.service';
import { PrismaService } from '@src/common/services/prisma.service';
import { StringService } from '@src/common/services/string.service';

import { GqlException } from '@src/common/utils/gql-exception.util';

import { SignedIn } from '../entities/signed-in.entity';

import { ForgotPasswordByEmailInput } from '../dto/forgot-password-by-email.input';
import { ForgotPasswordByUserNameInput } from '../dto/forgot-password-by-username.input';
import { OtpValidationInput } from '../dto/otp-validation.input';
import { RefreshTokenInput } from '../dto/refresh-token.input';
import { ResetPasswordInput } from '../dto/reset-password.input';
import { SignInEmailInput } from '../dto/sigin-in-email.input';
import { SignInUserNameInput } from '../dto/sigin-in-username.input';
import { UpdatePasswordInput } from '../dto/update-password.input';

import { RoleOnUserStatusEnum } from '../../role/enums/role-on-user-status.enum';
import { AuthNextStepEnum } from '../enums/auth-next-step.enum';
import { OtpActionEnum } from '../enums/otp-action.enum';

import { IOtpActionTokenPayload } from '../interfaces/otp-action-token-payload.interface';
import { IOtpTokenPayload } from '../interfaces/otp-token-payload.interface';
import { IRefreshTokenPayload } from '../interfaces/refresh-token-payload.interface';
import { ITokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
    private readonly bcryptService: BcryptService,
    private readonly stringService: StringService,
    private readonly dateService: DateService,
    private readonly mailService: MailService,
  ) {}

  async signInEmail(signInEmailInput: SignInEmailInput): Promise<SignedIn> {
    const { email, password } = signInEmailInput;
    const user = await this.prismaService.user.findFirst({
      where: {
        email: { email_value: { equals: email, mode: 'insensitive' } },
      },
      include: { email: true },
    });

    if (!user) {
      throw new GqlException('401.977936');
    }

    const passwordCheck = await this.bcryptService.compare(
      password,
      user.password_hash,
    );

    if (!passwordCheck) {
      throw new GqlException('401.977936');
    }

    if (user.force_reset_password) {
      const generatedResetOtp = await this.generateResetOtp(
        user.user_id,
        user.email.email_value,
      );
      return generatedResetOtp;
    }

    if (user.two_factor_auth) {
      const generated2faOtp = await this.generate2faOtp(
        user.user_id,
        user.email.email_value,
      );
      return generated2faOtp;
    }

    if (!user.email.is_validated) {
      const generatedEmailValidationOtp = await this.generateEmailValidationOtp(
        user.user_id,
        user.email.email_value,
      );
      return generatedEmailValidationOtp;
    }

    const token = await this.generateToken(user.user_id, user.puat);

    const refresh_token = await this.generateRefreshToken(
      user.user_id,
      user.puat,
    );

    return { token, refresh_token, next_step: AuthNextStepEnum.PASS };
  }

  async signInUserName(
    signInUserNameInput: SignInUserNameInput,
  ): Promise<SignedIn> {
    const { user_name, password } = signInUserNameInput;
    const user = await this.prismaService.user.findFirst({
      where: {
        user_name: { equals: user_name, mode: 'insensitive' },
      },
      include: { email: true },
    });

    if (!user) {
      throw new GqlException('401.977936');
    }

    const passwordCheck = await this.bcryptService.compare(
      password,
      user.password_hash,
    );

    if (!passwordCheck) {
      throw new GqlException('401.977936');
    }

    if (user.force_reset_password) {
      const generatedResetOtp = await this.generateResetOtp(
        user.user_id,
        user.email.email_value,
      );
      return generatedResetOtp;
    }

    if (user.two_factor_auth) {
      const generated2faOtp = await this.generate2faOtp(
        user.user_id,
        user.email.email_value,
      );
      return generated2faOtp;
    }

    if (!user.email.is_validated) {
      const generatedEmailValidationOtp = await this.generateEmailValidationOtp(
        user.user_id,
        user.email.email_value,
      );
      return generatedEmailValidationOtp;
    }

    const token = await this.generateToken(user.user_id, user.puat);

    const refresh_token = await this.generateRefreshToken(
      user.user_id,
      user.puat,
    );

    return { token, refresh_token, next_step: AuthNextStepEnum.PASS };
  }

  async generateResetOtp(user_id: number, email: string): Promise<SignedIn> {
    const otpToken = await this.generateOtpToken(
      user_id,
      OtpActionEnum.RESET_PASSWORD,
    );

    this.mailService.sendResetPasswordOtp({
      otp: otpToken.otp,
      to: email,
    });

    return {
      next_step: AuthNextStepEnum.RESET_PASSWOD,
      token: otpToken.token,
      email,
    };
  }

  async generate2faOtp(user_id: number, email: string): Promise<SignedIn> {
    const otpToken = await this.generateOtpToken(
      user_id,
      OtpActionEnum.TWO_FACTOR_AUTH,
    );

    this.mailService.sendTwoFactorAuthOtp({
      otp: otpToken.otp,
      to: email,
    });

    return {
      next_step: AuthNextStepEnum.TWO_FACTOR_AUTH,
      token: otpToken.token,
      email: email,
    };
  }

  async generateEmailValidationOtp(
    user_id: number,
    email: string,
  ): Promise<SignedIn> {
    const otpToken = await this.generateOtpToken(
      user_id,
      OtpActionEnum.EMAIL_VALIDATION,
    );

    this.mailService.sendEmailValidationOtp({
      otp: otpToken.otp,
      to: email,
    });

    return {
      next_step: AuthNextStepEnum.EMAIL_VALIDATION,
      token: otpToken.token,
      email: email,
    };
  }

  async forgotPasswordByUserName(
    forgotPasswordByUserNameInput: ForgotPasswordByUserNameInput,
  ): Promise<SignedIn> {
    const { user_name } = forgotPasswordByUserNameInput;
    const user = await this.prismaService.user.findFirst({
      where: {
        user_name: { equals: user_name, mode: 'insensitive' },
      },
      include: { email: true },
    });

    if (!user) {
      throw new GqlException('404.833661');
    }

    const otpToken = await this.generateOtpToken(
      user.user_id,
      OtpActionEnum.RESET_PASSWORD,
    );

    this.mailService.sendResetPasswordOtp({
      otp: otpToken.otp,
      to: user.email.email_value,
    });

    return {
      next_step: AuthNextStepEnum.RESET_PASSWOD,
      token: otpToken.token,
      email: user.email.email_value,
    };
  }

  async forgotPasswordByEmail(
    forgotPasswordByEmailInput: ForgotPasswordByEmailInput,
  ): Promise<SignedIn> {
    const { email } = forgotPasswordByEmailInput;
    const user = await this.prismaService.user.findFirst({
      where: {
        email: { email_value: { equals: email, mode: 'insensitive' } },
      },
      include: { email: true },
    });

    if (!user) {
      throw new GqlException('404.833661');
    }

    const otpToken = await this.generateOtpToken(
      user.user_id,
      OtpActionEnum.RESET_PASSWORD,
    );

    this.mailService.sendResetPasswordOtp({
      otp: otpToken.otp,
      to: user.email.email_value,
    });

    return {
      next_step: AuthNextStepEnum.RESET_PASSWOD,
      token: otpToken.token,
      email: user.email.email_value,
    };
  }

  async validateOtpToken(
    token: string,
    action?: OtpActionEnum,
    skipTokenExpiration: boolean = false,
  ): Promise<{ user: UserModel; payload: IOtpTokenPayload }> {
    let payload: IOtpTokenPayload;
    try {
      payload = this.jwtService.verify<IOtpTokenPayload>(token, {
        secret: this.appConfigService.authConfig.otpJwt.secret,
        ignoreExpiration: skipTokenExpiration,
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new GqlException('401.254774');
      }

      throw new GqlException('401.977936');
    }

    if (action && payload.act !== action) {
      throw new GqlException('403.552582');
    }

    const user = await this.prismaService.user.findUnique({
      where: { user_id: +payload.sub },
      include: { email: true },
    });

    if (!user) {
      throw new GqlException('401.977936');
    }

    return { user, payload };
  }

  async validateOtpActionToken(
    token: string,
    action: OtpActionEnum,
  ): Promise<UserModel> {
    let payload: IOtpActionTokenPayload;
    try {
      payload = this.jwtService.verify<IOtpTokenPayload>(token, {
        secret: this.appConfigService.authConfig.otpActionJwt.secret,
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new GqlException('401.254774');
      }
      throw new GqlException('401.977936');
    }

    if (payload.act !== action) {
      throw new GqlException('403.552582');
    }

    const user = await this.prismaService.user.findUnique({
      where: { user_id: +payload.sub },
    });

    if (!user) {
      throw new GqlException('401.977936');
    }

    return user;
  }

  async validateToken(
    token: string,
    acceptedRoles?: string[],
  ): Promise<{
    user: UserModel;
    payload: ITokenPayload;
  }> {
    let payload: ITokenPayload;
    try {
      payload = this.jwtService.verify<ITokenPayload>(token);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new GqlException('401.254774');
      }
      throw new GqlException('401.977936');
    }

    const user = await this.prismaService.user.findUnique({
      where: { user_id: +payload.sub },
      include: { roles_on_users: { include: { role: true } } },
    });

    if (
      !user ||
      new Date(payload.puat).getTime() !== new Date(user.puat).getTime()
    ) {
      throw new GqlException('401.977936');
    }

    if (acceptedRoles) {
      const accepted =
        !acceptedRoles.length ||
        acceptedRoles.some((role_code: string) =>
          user.roles_on_users.some(
            (role_on_user) =>
              role_on_user.status === RoleOnUserStatusEnum.ACTIVE &&
              role_on_user.role.role_code === role_code,
          ),
        );

      if (!accepted) {
        throw new GqlException('403.552582');
      }
    }

    return { user, payload };
  }

  async reSendOtp(
    user: { email: EmailModel } & UserModel,
    action: OtpActionEnum,
  ): Promise<SignedIn> {
    switch (action) {
      case OtpActionEnum.EMAIL_VALIDATION:
        return this.generateEmailValidationOtp(
          user.user_id,
          user.email.email_value,
        );
      case OtpActionEnum.TWO_FACTOR_AUTH:
        return this.generate2faOtp(user.user_id, user.email.email_value);
      case OtpActionEnum.RESET_PASSWORD:
        return this.generateResetOtp(user.user_id, user.email.email_value);

      default:
        break;
    }
  }

  async validateOtp(
    user: UserModel,
    otpValidationInput: OtpValidationInput,
    action: OtpActionEnum,
    otpHash: string,
  ): Promise<SignedIn> {
    const { otp } = otpValidationInput;

    const otpCheck = await this.bcryptService.compare(otp, otpHash);

    if (!otpCheck) {
      throw new GqlException('401.977936');
    }

    await this.prismaService.user.update({
      where: { user_id: user.user_id },
      data: { email: { update: { is_validated: true } } },
    });

    if (
      action === OtpActionEnum.EMAIL_VALIDATION ||
      action === OtpActionEnum.TWO_FACTOR_AUTH
    ) {
      const token = await this.generateToken(user.user_id, user.puat);

      const refresh_token = await this.generateRefreshToken(
        user.user_id,
        user.puat,
      );

      return { token, refresh_token, next_step: AuthNextStepEnum.PASS };
    }

    const token = await this.generateOtpActionToken(user.user_id, action);

    return { next_step: AuthNextStepEnum.RESET_PASSWOD_FINISH, token };
  }

  async validateRefreshToken(token: string): Promise<{
    user: UserModel;
    payload: IRefreshTokenPayload;
  }> {
    let payload: IRefreshTokenPayload;
    try {
      payload = this.jwtService.verify<IRefreshTokenPayload>(token, {
        secret: this.appConfigService.authConfig.refreshJwt.secret,
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new GqlException('401.254774');
      }
      throw new GqlException('401.977936');
    }

    const user = await this.prismaService.user.findUnique({
      where: { user_id: +payload.sub },
    });

    if (
      !user ||
      new Date(payload.puat).getTime() !== new Date(user.puat).getTime()
    ) {
      throw new GqlException('401.977936');
    }

    return { user, payload };
  }

  async refreshToken(refreshTokenInput: RefreshTokenInput): Promise<SignedIn> {
    const { refresh_token } = refreshTokenInput;
    const { payload } = await this.validateRefreshToken(refresh_token);
    const token = await this.generateToken(payload.sub, payload.puat);

    return { refresh_token, token, next_step: AuthNextStepEnum.PASS };
  }

  async resetPassword(
    resetPasswordInput: ResetPasswordInput,
    user: UserModel,
  ): Promise<SignedIn> {
    const { password } = resetPasswordInput;
    const password_hash = await this.bcryptService.hash(password);

    const updatedUser = await this.prismaService.user.update({
      where: { user_id: user.user_id },
      data: {
        password_hash,
        puat: new Date(),
        force_reset_password: false,
      },
    });

    const token = await this.generateToken(user.user_id, updatedUser.puat);

    const refresh_token = await this.generateRefreshToken(
      user.user_id,
      updatedUser.puat,
    );

    return { token, refresh_token, next_step: AuthNextStepEnum.PASS };
  }

  async updatePassword(
    resetPasswordInput: UpdatePasswordInput,
    user: UserModel,
  ): Promise<SignedIn> {
    const { password, old_password } = resetPasswordInput;

    if (password === old_password) {
      throw new GqlException('409.654214');
    }

    const passwordCheck = await this.bcryptService.compare(
      old_password,
      user.password_hash,
    );

    if (!passwordCheck) {
      throw new GqlException('401.977936');
    }

    const password_hash = await this.bcryptService.hash(password);

    const updatedUser = await this.prismaService.user.update({
      where: { user_id: user.user_id },
      data: {
        password_hash,
        puat: new Date(),
        force_reset_password: false,
      },
    });

    const token = await this.generateToken(user.user_id, updatedUser.puat);

    const refresh_token = await this.generateRefreshToken(
      user.user_id,
      updatedUser.puat,
    );

    return { token, refresh_token, next_step: AuthNextStepEnum.PASS };
  }

  async generateOtpToken(
    user_id: number,
    action: OtpActionEnum,
  ): Promise<{ token: string; otp: string }> {
    const otp = await this.stringService.generateRandom(
      this.appConfigService.authConfig.otpJwt.otpLength,
      true,
    );
    const otpHash = await this.bcryptService.hash(otp);
    const token = this.jwtService.sign(
      { sub: user_id, act: action, oh: otpHash } as IOtpTokenPayload,
      {
        expiresIn: this.appConfigService.authConfig.otpJwt.expiresIn,
        secret: this.appConfigService.authConfig.otpJwt.secret,
      },
    );
    return { token, otp };
  }

  async generateOtpActionToken(
    user_id: number,
    action: OtpActionEnum,
  ): Promise<string> {
    const token = this.jwtService.sign(
      { sub: user_id, act: action } as IOtpActionTokenPayload,
      {
        expiresIn: this.appConfigService.authConfig.otpActionJwt.expiresIn,
        secret: this.appConfigService.authConfig.otpActionJwt.secret,
      },
    );
    return token;
  }

  async generateToken(user_id: number, puat: Date): Promise<string> {
    const token = this.jwtService.sign({
      sub: user_id,
      puat,
    } as ITokenPayload);
    return token;
  }

  async generateRefreshToken(
    user_id: number,
    puat: Date,
    expiresIn?: string | number,
  ): Promise<string> {
    const token = this.jwtService.sign(
      { sub: user_id, puat } as IRefreshTokenPayload,
      {
        secret: this.appConfigService.authConfig.refreshJwt.secret,
        expiresIn:
          expiresIn || this.appConfigService.authConfig.refreshJwt.expiresIn,
      },
    );
    return token;
  }
}
