import { MinLength } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';

@InputType()
export class CreateTeacher {
  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String)
  user_name: string;
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String)
  password: string;
}
