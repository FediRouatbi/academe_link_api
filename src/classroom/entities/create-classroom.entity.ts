import { Field, ObjectType } from '@nestjs/graphql';
import { Student } from 'src/student/entities/create-student.entity';
import { Teacher } from 'src/teacher/entities/get-teacher.entity';
import { Course } from 'src/course/entities/course.entity';
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

  @Field(() => [Course], { nullable: true })
  course: Course[];
}
