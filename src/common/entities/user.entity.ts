import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  user_id: number;

  @Field(() => String, { nullable: true })
  image_url: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String)
  user_name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
