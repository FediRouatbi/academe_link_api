import { MaxLength, MinLength } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OtpValidationInput {
  @Field(() => String)
  @MinLength(4)
  @MaxLength(4)
  otp: string;
}
