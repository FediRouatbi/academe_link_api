import pagination from 'prisma-extension-pagination';

import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  withExtensions() {
    return this.$extends(
      pagination({ pages: { includePageCount: true, limit: 10 } }),
    );
  }
}
