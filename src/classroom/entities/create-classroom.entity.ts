import { User } from 'src/user/entities/create-user.entity';
import { student } from './../../../node_modules/.prisma/client/index.d';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Classroom {
  @Field(() => String)
  classroom_id: string;

  @Field(() => String)
  classroom_name: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => [User])
  student: User[];

  @Field(() => [String])
  teacher: string[];

  @Field(() => [String])
  subject: string[];
}
