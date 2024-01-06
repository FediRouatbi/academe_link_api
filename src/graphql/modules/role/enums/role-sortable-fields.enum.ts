import { registerEnumType } from '@nestjs/graphql';

export enum RoleSortableFieldsEnum {
  'name' = 'name',
  'role_code' = 'role_code',
}

registerEnumType(RoleSortableFieldsEnum, {
  name: 'RoleSortableFieldsEnum',
});
