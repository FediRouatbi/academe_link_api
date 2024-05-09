import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/common/entities/user.entity';

@ObjectType()
export class TeacherCourses {
  @Field(() => Number)
  classroom_id: number;

  @Field(() => Number)
  subject_id: number;
}
@ObjectType()
export class Teacher {
  @Field(() => Int)
  teacher_id: number;

  @Field(() => User)
  user: User;

  @Field(() => [TeacherCourses])
  course: TeacherCourses[];
}
