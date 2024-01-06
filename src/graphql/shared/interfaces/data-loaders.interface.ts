import DataLoader from 'dataloader';

import { user as UserModel } from '@prisma/client';

export interface IDataLoaders {
  userLoader: DataLoader<number, UserModel, string>;
}
