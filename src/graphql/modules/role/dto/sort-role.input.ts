import { IsEnum } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { RoleSortableFieldsEnum } from '../enums/role-sortable-fields.enum';
import { SortOrderEnum } from '@src/graphql/shared/enums/sort-order.enum';

@InputType()
export class SortRoleInput {
  @Field(() => RoleSortableFieldsEnum)
  @IsEnum(RoleSortableFieldsEnum)
  field: RoleSortableFieldsEnum;

  @Field(() => SortOrderEnum)
  @IsEnum(SortOrderEnum)
  order: SortOrderEnum;

  get getSortStatement() {
    let orderBy = {};

    const field = this.field as string;
    orderBy = { [field]: this.order };

    return orderBy;
  }
}
