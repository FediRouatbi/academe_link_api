import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTeacher } from './create-teacher.input';
@InputType()
export class UpdateTeacher extends PartialType(CreateTeacher) {
  @Field(() => Number)
  teacher_id: number;
}
