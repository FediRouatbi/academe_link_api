import { MinLength } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteAccountInput {
  @Field(() => String)
  @MinLength(1)
  password: string;
}
