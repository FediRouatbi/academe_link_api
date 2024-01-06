import { Transform, TransformFnParams } from 'class-transformer';
import { MinLength } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignInUserNameInput {
  @Field(() => String)
  @MinLength(1)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  user_name: string;

  @Field(() => String)
  @MinLength(1)
  password: string;
}
