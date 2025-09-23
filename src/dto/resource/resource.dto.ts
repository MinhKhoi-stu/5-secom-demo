export type ResourceDto = {
  totalPages: 0;
  totalElements: 0;
  pageable: {
    pageNumber: 0;
    unpaged: true;
    paged: true;
    pageSize: 0;
    offset: 0;
    sort: {
      unsorted: true;
      sorted: true;
      empty: true;
    };
  };
  numberOfElements: 0;
  size: 0;
  content: [
    {
      version: 0;
      createdBy: string;
      updatedBy: string;
      createdDate: string;
      updatedDate: string;
      id: string;
      code: string;
      name: string;
      note: string;
    }
  ];
  number: 0;
  sort: {
    unsorted: true;
    sorted: true;
    empty: true;
  };
  first: true;
  last: true;
  empty: true;
};
