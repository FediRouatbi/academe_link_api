import { Reflector } from '@nestjs/core';

import { AuthService } from '../services/auth.service';

import { OtpValidationGuard } from './otp-validation.guard';

describe('OtpValidationGuard', () => {
  let authService: AuthService;
  let reflector: Reflector;
  it('should be defined', () => {
    expect(new OtpValidationGuard(reflector, authService)).toBeDefined();
  });
});
