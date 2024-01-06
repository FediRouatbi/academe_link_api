import { Field, Int, ObjectType } from '@nestjs/graphql';

import { IPageInfo } from '../interfaces/page-info.interface';

@ObjectType()
export class PageInfo implements IPageInfo {
  @Field(() => Boolean)
  isFirstPage: boolean;

  @Field(() => Boolean)
  isLastPage: boolean;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int, { nullable: true })
  previousPage: number | null;

  @Field(() => Int, { nullable: true })
  nextPage: number | null;

  @Field(() => Int)
  pageCount: number;

  @Field(() => Int)
  totalCount: number;
}
