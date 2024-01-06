import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AppConfigService } from './app-config.service';
import { BcryptService } from './bcrypt.service';
import { PrismaService } from './prisma.service';

describe('AppConfigService', () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [PrismaService, AppConfigService, BcryptService],
      exports: [PrismaService, AppConfigService, BcryptService],
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
