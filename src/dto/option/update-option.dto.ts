export type UpdateOptionDto = {
  version: number;
  id: string;
  code: string;
  name: string;
  note?: string | null;
//   config?: string | null;
  orderNo?: number;
  optionGroup: { id: string };
  optionSet?: null;
  parentOpt?: { id: string };
  image?: string | null;
  att1?: string | null;
  att2?: string | null;
  att3?: string | null;
  att4?: string | null;
  att5?: string | null;
};