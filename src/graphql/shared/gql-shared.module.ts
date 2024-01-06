import { Global, Module } from '@nestjs/common';

import { DataLoaderService } from './services/data-loader.service';
import { SharedRoleService } from './services/shared-role.service';

@Global()
@Module({
  providers: [SharedRoleService, DataLoaderService],
  exports: [SharedRoleService, DataLoaderService],
})
export class GqlSharedModule {}
