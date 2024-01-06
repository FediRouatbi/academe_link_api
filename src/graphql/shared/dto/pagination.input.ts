import { IsOptional, Min } from 'class-validator';

import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true })
  @Min(1)
  @IsOptional()
  page?: number;

  @Field(() => Int, { nullable: true })
  @Min(1)
  @IsOptional()
  limit?: number;
}
