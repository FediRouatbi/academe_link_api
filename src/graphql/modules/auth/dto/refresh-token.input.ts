import { Transform, TransformFnParams } from 'class-transformer';
import { IsJWT } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RefreshTokenInput {
  @Field(() => String)
  @IsJWT()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  refresh_token: string;
}
