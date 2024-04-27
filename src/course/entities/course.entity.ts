import { Subject } from './../../subject/entities/subject.entity';
import { Classroom } from './../../classroom/entities/create-classroom.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Teacher } from 'src/teacher/entities/get-teacher.entity';

@ObjectType()
export class Course {
  @Field(() => Classroom)
  classroom: Classroom;

  @Field(() => Teacher)
  teacher: Teacher;

  @Field(() => Subject)
  subject: Subject;
}
