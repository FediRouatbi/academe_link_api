import DataLoader from 'dataloader';

import { Injectable } from '@nestjs/common';

import { user as UserModel } from '@prisma/client';

import { PrismaService } from '@src/common/services/prisma.service';

import { IDataLoaders } from '../interfaces/data-loaders.interface';

@Injectable()
export class DataLoaderService {
  constructor(private readonly prismaService: PrismaService) {}

  get loaders(): IDataLoaders {
    return {
      userLoader: new DataLoader<number, UserModel>(async (keys: number[]) => {
        const users = await this.prismaService.user.findMany({
          where: { user_id: { in: keys } },
        });
        return keys.map((id) => users.find((user) => user.user_id === id));
      }),
    };
  }
}
