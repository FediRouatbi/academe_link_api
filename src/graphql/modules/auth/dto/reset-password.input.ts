import { IsStrongPassword } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { IsMatch } from '@src/common/decorators/is_match.decorator';

@InputType()
export class ResetPasswordInput {
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
  @IsMatch<ResetPasswordInput>('password')
  confirm_password: string;
}
