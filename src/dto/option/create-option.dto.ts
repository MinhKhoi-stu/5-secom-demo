export interface CreateOptionDto {
  code: string;
  name: string;
  note?: string;
  config?: string;
  orderNo?: number;
  optionGroup: {
    id: string;
  };
  optionSet?: {
    id: string;
  };
  parentOpt?: {
    id: string;
  };
  // parentOpt?: {
  //   id: string;
  //   code: string;
  //   name: string;
  //   note: string;
  //   config: any;
  //   orderNo: number;
  // };
  image?: string;
  att1?: string;
  att2?: string;
  att3?: string;
  att4?: string;
  att5?: string;
}
