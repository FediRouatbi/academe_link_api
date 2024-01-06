import { Field, ObjectType } from '@nestjs/graphql';

import { AuthNextStepEnum } from '../enums/auth-next-step.enum';

@ObjectType()
export class SignedIn {
  @Field(() => AuthNextStepEnum)
  next_step: AuthNextStepEnum;

  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => String, { nullable: true })
  refresh_token?: string;

  @Field(() => String, { nullable: true })
  email?: string;
}
