import { Optional } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/common/entities/user.entity';

@ObjectType()
class ClassroomTest {
  @Field(() => Number)
  classroom_id: number;

  @Field(() => String)
  classroom_name: string;

  @Field(() => Date)
  createdAt: Date;
}

@ObjectType()
export class Student {
  @Field(() => Number)
  student_id: number;

  @Field(() => Number)
  user_id: number;

  @Field(() => Number)
  classroom_id: number;

  // @Field(() => ClassroomTest)
  // @Optional()
  // classroom: ClassroomTest;

  @Field(() => User)
  user: User;
}
