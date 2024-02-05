import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Teacher {
  @Field(() => Int)
  user_id: number;

  @Field(() => String)
  user_name: string;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;
}
