import { registerEnumType } from '@nestjs/graphql';

export enum RoleOnUserStatusEnum {
  'ACTIVE' = 'ACTIVE',
  'BLOCKED' = 'BLOCKED',
}

registerEnumType(RoleOnUserStatusEnum, {
  name: 'RoleOnUserStatusEnum',
});
