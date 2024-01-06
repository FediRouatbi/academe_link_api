import { registerEnumType } from '@nestjs/graphql';

export enum SortOrderEnum {
  'asc' = 'asc',
  'desc' = 'desc',
}

registerEnumType(SortOrderEnum, {
  name: 'SortOrderEnum',
});
