import { Field, ObjectType } from '@nestjs/graphql';
import { Student } from 'src/student/entities/create-student.entity';
import { Teacher } from 'src/teacher/entities/get-teacher.entity';
import { Course } from 'src/course/entities/course.entity';

@ObjectType()
export class Classroom {
  @Field(() => Number)
  classroom_id: number;

  @Field(() => String)
  classroom_name: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => [Student], { nullable: true })
  student: Student[];

  @Field(() => [Course], { nullable: true })
  course: Course[];
}
