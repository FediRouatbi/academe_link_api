import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUser {
  @Field(() => String)
  classroom_name: string;

  @Field(() => [String])
  subjects: string[];

  @Field(() => [String])
  students: string[];

  @Field(() => [String])
  teachers: string[];
}
