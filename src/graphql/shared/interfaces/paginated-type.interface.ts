import { IPageInfo } from './page-info.interface';

export interface IPaginatedType<T> {
  data: T[];

  pageInfo?: IPageInfo;
}
