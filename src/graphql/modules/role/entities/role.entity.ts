import { Field, Int, ObjectType } from '@nestjs/graphql';

import { RoleCodeEnum } from '../enums/role-code.enum';

@ObjectType()
export class Role {
  @Field(() => Int)
  role_id: number;

  @Field(() => String)
  name: string;

  @Field(() => RoleCodeEnum)
  role_code: RoleCodeEnum;
}
