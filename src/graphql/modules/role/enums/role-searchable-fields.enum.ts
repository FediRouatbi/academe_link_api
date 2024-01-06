import { registerEnumType } from '@nestjs/graphql';

export enum RoleSearchableFieldsEnum {
  name = 'name',
  role_code = 'role_code',
}

registerEnumType(RoleSearchableFieldsEnum, {
  name: 'RoleSearchableFieldsEnum',
});
