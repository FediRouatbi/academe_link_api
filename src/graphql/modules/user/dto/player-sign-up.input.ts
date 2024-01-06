import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsStrongPassword, MinLength } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { IsMatch } from '@src/common/decorators/is_match.decorator';

@InputType()
export class PlayerSignUpInput {
  @Field(() => String)
  @MinLength(3)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  user_name: string;

  @Field(() => String)
  @MinLength(3)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  first_name: string;

  @Field(() => String)
  @MinLength(3)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  last_name: string;

  @Field(() => String)
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  email: string;

  @Field(() => String)
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @Field(() => String)
  @IsMatch<PlayerSignUpInput>('password')
  confirm_password: string;
}
