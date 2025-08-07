export type ProductDto = {
  version: number;
  createdBy: string | null;
  updatedBy: string | null;
  createdDate: string;
  updatedDate: string | null;
  id: string;
  code: string;
  name: string;
  note: string;
  config: null;
  orderNo: number;
  //
  optGroupCode?: string;
  parentOpt: string | null;
  image: string | null;
  att1: string | null;
  att2: string | null;
  att3: string | null;
  att4: string | null;
  att5: string | null;
};


