import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/common/entities/user.entity';
import { Student } from 'src/student/entities/create-student.entity';
import { Teacher } from 'src/teacher/entities/get-teacher.entity';

@ObjectType()
export class Classroom {
  @Field(() => String)
  classroom_id: string;

  @Field(() => String)
  classroom_name: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => [Student])
  student: Student[];

  @Field(() => [Teacher])
  teacher: Teacher[];

  @Field(() => [String])
  subject: string[];
}
