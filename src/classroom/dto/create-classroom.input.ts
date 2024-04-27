import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

@InputType()
export class CreateClassroom {
  @Field(() => String)
  classroom_name: string;

  @Transform(({ value }) => value?.student_id)
  @Field(() => [String], { defaultValue: [], nullable: true })
  subjects: string[];

  @Field(() => [String], { defaultValue: [], nullable: true })
  students: string[];

  @Field(() => [String], { defaultValue: [], nullable: true })
  teachers: string[];
}
