import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

@InputType()
class StudentsIds {
  @Field(() => Number)
  student_id: number;
}

@InputType()
class TeachersIds {
  @Field(() => Number)
  teacher_id: number;

  @Field(() => Number)
  subject_id: number;
}
@InputType()
export class CreateClassroom {
  @Field(() => String)
  classroom_name: string;

  @Field(() => String)
  description: string;

  @Field(() => [StudentsIds], { nullable: true })
  studentsIds: StudentsIds[] | null;

  @Field(() => [TeachersIds], { nullable: true })
  teachersIds: TeachersIds[];
}
