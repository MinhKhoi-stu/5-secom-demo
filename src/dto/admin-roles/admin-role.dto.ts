import {AdminRightDto} from "dto/admin-rights/admin-rights.dto";

export type AdminRoleDto = {
  id: string;
  code: string;
  name: string;
  level: number;
  rights: AdminRightDto;
  note: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
};
