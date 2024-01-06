import { SetMetadata } from '@nestjs/common';

import { RoleCodeEnum } from '../../role/enums/role-code.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleCodeEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
