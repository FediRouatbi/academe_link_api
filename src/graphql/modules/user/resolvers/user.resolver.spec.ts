import { Test, TestingModule } from '@nestjs/testing';

import { AuthModule } from '../../auth/auth.module';
import { CommonModule } from '@src/common/common.module';

import { UserResolver } from './user.resolver';

import { UserService } from '../services/user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService],
      imports: [CommonModule, AuthModule],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
