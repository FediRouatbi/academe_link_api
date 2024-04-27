import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubjectInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;
}
