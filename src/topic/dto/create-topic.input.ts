import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTopic {
  @Field(() => String)
  content: string;
}
