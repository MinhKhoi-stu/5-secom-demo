import { AdminRoleDto } from 'dto/admin-roles/admin-role.dto';
import { ADMIN_USER_STATUS } from 'utils/enums';

// export type AdminUserDto = {
  // id: number;
  // name: string;
  // email: string;
  // status: ADMIN_USER_STATUS;
  // phone?: string;
  // birthday?: Date;
  // gender?: string;
  // adminRoleId?: number;
  // createdAt: Date;
  // updatedAt: Date;
  // adminRole?: AdminRoleDto;
// };
export type AdminUserDto = {
  id: string;
  // code: string;
  name: string;
  username: string;
  address: string | null;
  dob: string | null;
  phone: string | null;
  email: string | null; 
  idCardNumber: string | null;
  idCardDate: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdDate: string;
  updatedDate: string;
  version: number;
  adminRoleId?: string;
  roleId: string;
  role: {"id": "roleId"}
};
