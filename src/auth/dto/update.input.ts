import { IsEmail, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUser {
  @Field()
  user_id: number;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  user_name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  password?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  image_url?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;
}
