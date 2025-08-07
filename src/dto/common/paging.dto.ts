export type PagingDto = {
  pageIndex?: number;
  pageSize?: number;
  keyword?: string;

  page: number;
  size: number;
};

export type PagingDataDto<T> = {
  content: T[]; //thêm
  count: number;
  rows: T[];
  totalElements: number; //pagination
  totalPages: number; //pagination

  page: number;
  size: number;
};
