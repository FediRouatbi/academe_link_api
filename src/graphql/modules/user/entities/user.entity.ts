import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  user_id: number;

  @Field(() => String)
  user_name: string;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => Boolean)
  force_reset_password: boolean;

  @Field(() => Boolean)
  two_factor_auth: boolean;
}
