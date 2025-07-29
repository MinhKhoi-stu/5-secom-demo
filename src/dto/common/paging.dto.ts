export type PagingDto = {
  pageIndex?: number;
  pageSize?: number;
  keyword?: string;
};

export type PagingDataDto<T> = {
  content: T[]; //thêm
  count: number;
  rows: T[];
};
