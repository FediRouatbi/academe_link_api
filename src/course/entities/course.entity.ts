import { Subject } from './../../subject/entities/subject.entity';
import { Classroom } from './../../classroom/entities/create-classroom.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Teacher } from 'src/teacher/entities/get-teacher.entity';
import { Topic } from 'src/topic/entities/topic.entity';

@ObjectType()
export class Course {
  @Field(() => Number)
  id: number;

  @Field(() => Classroom)
  classroom: Classroom;

  @Field(() => Teacher)
  teacher: Teacher;

  @Field(() => Subject)
  subject: Subject;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => [Topic], { nullable: true })
  topic: [Topic];
}
