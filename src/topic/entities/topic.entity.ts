import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Topic {
  @Field(() => Number)
  topic_id: number;
  @Field(() => String)
  content: string;
}
