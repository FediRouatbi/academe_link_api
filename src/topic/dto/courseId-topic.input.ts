import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CourseId {
  @Field(() => Number, { nullable: true })
  classroom_id?: number;
  @Field(() => Number, { nullable: true })
  teacher_id?: number;
  @Field(() => Number, { nullable: true })
  subject_id?: number;
}
