export interface IPageInfo {
  isFirstPage: boolean;

  isLastPage: boolean;

  currentPage: number;

  previousPage: number | null;

  nextPage: number | null;

  pageCount: number;

  totalCount: number;
}
