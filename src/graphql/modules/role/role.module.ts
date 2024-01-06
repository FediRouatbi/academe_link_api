import { Module } from '@nestjs/common';

import { RoleResolver } from './resolvers/role.resolver';

import { RoleService } from './services/role.service';

@Module({
  providers: [RoleService, RoleResolver],
})
export class RoleModule {}
