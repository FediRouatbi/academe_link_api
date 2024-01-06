import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignInEmailInput {
  @Field(() => String)
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  email: string;

  @Field(() => String)
  @MinLength(1)
  password: string;
}
