export type ParentOptDto = {
  id: string;
  code: string;
  name: string;
  note?: string | null;
  config?: string | null;
  orderNo?: number;
};

export type OptionDto = {
  version: number;
  // config: any;
  id: string;
  code: string;
  name: string;
  note: string | null;
  image: string | null;
  orderNo: number;
  // optionGroup: {"id" :string},
  parentOpt: ParentOptDto | null;
  att1: string | null;
  att2: string | null;
  att3: string | null;
  att4: string | null;
  att5: string | null;
};
