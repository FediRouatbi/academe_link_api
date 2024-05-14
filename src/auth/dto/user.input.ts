import { Field, ObjectType } from '@nestjs/graphql';
import { RoleCodeEnum } from '@prisma/client';

@ObjectType()
export class CurrentUser {
  @Field(() => Number)
  user_id: number;

  @Field(() => String, { nullable: true })
  image_url: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String)
  user_name: string;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String)
  email: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => RoleCodeEnum)
  role: RoleCodeEnum;
}
