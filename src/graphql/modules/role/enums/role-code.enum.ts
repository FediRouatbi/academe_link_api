import { registerEnumType } from '@nestjs/graphql';

export const RoleCodeEnum: {
  CLIENT: 'CLIENT';
  ADMIN: 'ADMIN';
} = {
  CLIENT: 'CLIENT',
  ADMIN: 'ADMIN',
};

export type RoleCodeEnum = (typeof RoleCodeEnum)[keyof typeof RoleCodeEnum];

registerEnumType(RoleCodeEnum, {
  name: 'RoleCodeEnum',
});
