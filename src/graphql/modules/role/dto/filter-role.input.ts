import { IsOptional, MinLength } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterRoleInput {
  @Field(() => String, { nullable: true })
  @MinLength(1)
  @IsOptional()
  name?: string;
}
