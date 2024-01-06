import { Test, TestingModule } from '@nestjs/testing';

import { AuthModule } from '../../auth/auth.module';
import { CommonModule } from '@src/common/common.module';

import { UserResolver } from '../resolvers/user.resolver';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService],
      imports: [CommonModule, AuthModule],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
