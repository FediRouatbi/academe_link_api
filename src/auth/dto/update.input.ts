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

  @IsOptional()
  password?: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;
}
