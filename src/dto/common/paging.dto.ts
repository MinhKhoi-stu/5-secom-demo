export type PagingDto = {
  pageIndex?: number;
  pageSize?: number;
  keyword?: string;
};

export type PagingDataDto<T> = {
  count: number;
  rows: T[];
};
