import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { FilterRoleInput } from './filter-role.input';

import { SortRoleInput } from './sort-role.input';

import { SearchRoleInput } from './search-role.inpu';

@InputType()
export class RoleFindOptionsInput {
  @Field(() => SearchRoleInput, { nullable: true })
  @Type(() => SearchRoleInput)
  @ValidateNested()
  @IsOptional()
  searchOption?: SearchRoleInput;

  @Field(() => SortRoleInput, { nullable: true })
  @Type(() => SortRoleInput)
  @ValidateNested()
  @IsOptional()
  sortOption?: SortRoleInput;

  @Field(() => FilterRoleInput, { nullable: true })
  @Type(() => FilterRoleInput)
  @ValidateNested()
  @IsOptional()
  filterOption?: FilterRoleInput;
}
