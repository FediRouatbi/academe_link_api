import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Number)
  student_id: number;

  @Field(() => Number)
  user_id: number;

  @Field(() => Number)
  classroom_id: number;
}
