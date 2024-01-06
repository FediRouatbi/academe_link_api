import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

import { PageInfo } from './page-info.entity';

import { IPaginatedType } from '../interfaces/paginated-type.interface';

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef])
    data: T[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
