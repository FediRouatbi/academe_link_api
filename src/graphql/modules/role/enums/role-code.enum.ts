import { registerEnumType } from '@nestjs/graphql';

export const RoleCodeEnum: {
  CLIENT: 'CLIENT';
  STUDENT: 'STUDENT';
  TEACHER: 'TEACHER';
} = {
  CLIENT: 'CLIENT',
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
};

export type RoleCodeEnum = (typeof RoleCodeEnum)[keyof typeof RoleCodeEnum];

registerEnumType(RoleCodeEnum, {
  name: 'RoleCodeEnum',
});
