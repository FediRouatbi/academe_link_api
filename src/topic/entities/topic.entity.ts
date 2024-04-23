import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Topic {
  @Field(() => String)
  content: string;
}
