import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateClassroom } from './create-classroom.input';
@InputType()
export class UpdateClassroom extends PartialType(CreateClassroom) {
  @Field(() => Number)
  classroom_id: number;
}
