import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { email as EmailModel, user as UserModel } from '@prisma/client';

import { AuthService } from '../services/auth.service';

import { OtpActionValidationGuard } from '../guards/otp-action-validation.guard';
import { OtpValidationGuard } from '../guards/otp-validation.guard';

import { OtpAction } from '../decorators/otp-action.decorator';
import { ReqOtp } from '../decorators/req-otp.decorator';
import { ReqUser } from '../decorators/req-user.decorator';
import { SkipAuth } from '../decorators/skip-auth.decorator';
import { SkipTokenExpiration } from '../decorators/skip-otp.decorator';

import { SignedIn } from '../entities/signed-in.entity';

import { ForgotPasswordByEmailInput } from '../dto/forgot-password-by-email.input';
import { ForgotPasswordByUserNameInput } from '../dto/forgot-password-by-username.input';
import { OtpValidationInput } from '../dto/otp-validation.input';
import { RefreshTokenInput } from '../dto/refresh-token.input';
import { ResetPasswordInput } from '../dto/reset-password.input';
import { SignInEmailInput } from '../dto/sigin-in-email.input';
import { SignInUserNameInput } from '../dto/sigin-in-username.input';
import { UpdatePasswordInput } from '../dto/update-password.input';

import { OtpActionEnum } from '../enums/otp-action.enum';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Mutation(() => SignedIn)
  async signInEmail(
    @Args('signInEmailInput') signInEmailInput: SignInEmailInput,
  ): Promise<SignedIn> {
    return this.authService.signInEmail(signInEmailInput);
  }

  @SkipAuth()
  @Mutation(() => SignedIn)
  async signInUserName(
    @Args('signInUserNameInput') signInUserNameInput: SignInUserNameInput,
  ): Promise<SignedIn> {
    return this.authService.signInUserName(signInUserNameInput);
  }

  @SkipAuth()
  @UseGuards(OtpValidationGuard)
  @Mutation(() => SignedIn)
  async validateOtp(
    @ReqOtp() reqOtp: { otpAction: OtpActionEnum; otpHash: string },
    @ReqUser() user: UserModel,
    @Args('otpValidationInput') otpValidationInput: OtpValidationInput,
  ): Promise<SignedIn> {
    return this.authService.validateOtp(
      user,
      otpValidationInput,
      reqOtp.otpAction,
      reqOtp.otpHash,
    );
  }

  @SkipAuth()
  @UseGuards(OtpValidationGuard)
  @SkipTokenExpiration()
  @Mutation(() => SignedIn)
  async reSendOtp(
    @ReqOtp() reqOtp: { otpAction: OtpActionEnum },
    @ReqUser() user: { email: EmailModel } & UserModel,
  ): Promise<SignedIn> {
    return this.authService.reSendOtp(user, reqOtp.otpAction);
  }

  @SkipAuth()
  @UseGuards(OtpActionValidationGuard)
  @OtpAction(OtpActionEnum.RESET_PASSWORD)
  @Mutation(() => SignedIn)
  async resetPassword(
    @ReqUser() user: UserModel,
    @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput,
  ): Promise<SignedIn> {
    return this.authService.resetPassword(resetPasswordInput, user);
  }

  @Mutation(() => SignedIn)
  async updatePassword(
    @ReqUser() user: UserModel,
    @Args('updatePasswordInput') updatePasswordInput: UpdatePasswordInput,
  ): Promise<SignedIn> {
    return this.authService.updatePassword(updatePasswordInput, user);
  }

  @SkipAuth()
  @Mutation(() => SignedIn)
  async forgotPasswordByEmail(
    @Args('forgotPasswordByEmailInput')
    forgotPasswordByEmailInput: ForgotPasswordByEmailInput,
  ): Promise<SignedIn> {
    return this.authService.forgotPasswordByEmail(forgotPasswordByEmailInput);
  }

  @SkipAuth()
  @Mutation(() => SignedIn)
  async forgotPasswordByUserName(
    @Args('forgotPasswordByUserNameInput')
    forgotPasswordByUserNameInput: ForgotPasswordByUserNameInput,
  ): Promise<SignedIn> {
    return this.authService.forgotPasswordByUserName(
      forgotPasswordByUserNameInput,
    );
  }

  @SkipAuth()
  @Mutation(() => SignedIn)
  async refreshToken(
    @Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput,
  ): Promise<SignedIn> {
    return this.authService.refreshToken(refreshTokenInput);
  }
}
