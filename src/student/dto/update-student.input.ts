import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateStudent } from './create-student.input';
@InputType()
export class UpdateStudent extends PartialType(CreateStudent) {
  @Field(() => Number)
  student_id: number;
}
