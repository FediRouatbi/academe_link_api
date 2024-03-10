import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/common/entities/user.entity';

@ObjectType()
export class Teacher {
  @Field(() => Int)
  teacher_id: number;

  @Field(() => Int)
  user_id: number;

  @Field(() => User)
  user: User;
}
