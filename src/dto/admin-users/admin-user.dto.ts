import { AdminRoleDto } from 'dto/admin-roles/admin-role.dto';
import { ADMIN_USER_STATUS } from 'utils/enums';

export type AdminUserDto = {
  id: number;
  fullName: string;
  email: string;
  status: ADMIN_USER_STATUS;
  phoneNumber?: string;
  birthday?: Date;
  gender?: string;
  adminRoleId?: number;
  createdAt: Date;
  updatedAt: Date;
  adminRole?: AdminRoleDto;
};
