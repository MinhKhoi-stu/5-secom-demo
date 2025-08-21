export type OrgunitDto = {
  createdBy: string | null;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  id: string;
  code: string;
  name: string;
  lvl: number;
  note: null;
  parentId?: string | null;
  namePath: string[];
};
