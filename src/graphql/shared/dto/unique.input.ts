import { Min } from 'class-validator';

import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UniqueInput {
  @Field(() => Int)
  @Min(1)
  id: number;
}
