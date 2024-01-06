import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ForgotPasswordByEmailInput {
  @Field(() => String)
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  email: string;
}
