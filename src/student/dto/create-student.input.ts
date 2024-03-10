import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStudent {
  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String)
  user_name: string;

  @Field(() => String)
  email?: string;

  @Field(() => String)
  password: string;

  
}
