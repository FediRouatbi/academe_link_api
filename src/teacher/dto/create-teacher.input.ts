import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ClassroomInput {
  @Field(() => Number)
  classroom_id: number;

  @Field(() => Number)
  subject_id: number;
}
@InputType()
export class CreateTeacher {
  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String)
  user_name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => [ClassroomInput], { nullable: true })
  classrooms: ClassroomInput[] | null;
}
