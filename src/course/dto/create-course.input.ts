import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  subject_id: number;
  @Field(() => Int, { description: 'Example field (placeholder)' })
  teacher_id: number;
  @Field(() => Int, { description: 'Example field (placeholder)' })
  classroom_id: number;
}
