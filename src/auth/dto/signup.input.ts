import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { RoleCodeEnum } from '@prisma/client';

registerEnumType(RoleCodeEnum, {
  name: 'RoleCodeEnum',
});
@InputType()
export class SignupInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  user_name: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field(() => RoleCodeEnum)
  role: RoleCodeEnum;
}
