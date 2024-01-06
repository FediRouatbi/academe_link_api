import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AppConfigService } from './app-config.service';
import { BcryptService } from './bcrypt.service';
import { PrismaService } from './prisma.service';

describe('PrismaServie', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [PrismaService, AppConfigService, BcryptService],
      exports: [PrismaService, AppConfigService, BcryptService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
