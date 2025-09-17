export type AdminRightDto = {
  version?: number;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: string;
  updatedDate?: string;
  // permission?: string;
  id: string;
  code: string;
  name: string;
  note?: string;
};
