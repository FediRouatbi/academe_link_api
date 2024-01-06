import { Reflector } from '@nestjs/core';

import { AuthService } from '../services/auth.service';

import { OtpActionValidationGuard } from './otp-action-validation.guard';

describe('OtpActionValidationGuard', () => {
  let authService: AuthService;
  let reflector: Reflector;
  it('should be defined', () => {
    expect(new OtpActionValidationGuard(reflector, authService)).toBeDefined();
  });
});
