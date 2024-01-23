import { Transform, TransformFnParams } from 'class-transformer';
import { ArrayMinSize, IsEnum, MinLength } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { RoleSearchableFieldsEnum } from '../enums/role-searchable-fields.enum';

@InputType()
export class SearchRoleInput {
  @Field(() => String)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(1)
  value: string;

  @Field(() => [RoleSearchableFieldsEnum])
  @IsEnum(RoleSearchableFieldsEnum, { each: true })
  @ArrayMinSize(1)
  fields: RoleSearchableFieldsEnum[];

  get getWhereStatement() {
    let search = {};

    const { fields, value } = this;
    const searchKeys = value.split(' ').filter((word) => {
      if (word.trim()) return word;
    });
    search = {
      AND: searchKeys.map((key) => ({
        OR: fields.map((field: any) => ({
          [field]: {
            contains: key,
            mode: 'insensitive',
          },
        })),
      })),
    };

    return search;
  }
}
