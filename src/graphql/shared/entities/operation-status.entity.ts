import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OperationStatus {
  @Field(() => Boolean)
  success: boolean;
}
