import { Reflector } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { CommonModule } from '@src/common/common.module';

import { AuthResolver } from '../resolvers/auth.resolver';

import { AuthService } from '../services/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authService: AuthService;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule, CommonModule],
      providers: [AuthResolver, AuthService],
      exports: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });
  it('should be defined', () => {
    expect(new AuthGuard(reflector, authService)).toBeDefined();
  });
});
