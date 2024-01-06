import { IsStrongPassword, MinLength } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { IsMatch } from '@src/common/decorators/is_match.decorator';

@InputType()
export class UpdatePasswordInput {
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
  @IsMatch<UpdatePasswordInput>('password')
  confirm_password: string;

  @Field(() => String)
  @MinLength(1)
  old_password: string;
}
