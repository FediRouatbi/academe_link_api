import { Field, Int, ObjectType } from '@nestjs/graphql';
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

  @Field(() => [Student], { nullable: true })
  student: Student[];

  @Field(() => [Teacher], {
    nullable: true,
    name: 'teacher',
    middleware: [
      async (c, next) => {
        const value = await next();
        return value?.map((el) => el.teacher);
      },
    ],
  })
  teacherClassroom: Teacher[];

  @Field(() => [String], { nullable: true })
  subject: string[];
}
