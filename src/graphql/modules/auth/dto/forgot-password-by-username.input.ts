import { Transform, TransformFnParams } from 'class-transformer';
import { MinLength } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ForgotPasswordByUserNameInput {
  @Field(() => String)
  @MinLength(3)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  user_name: string;
}
