import { PERMISSION } from 'utils/enums';

export type AdminRoleDto = {
  id: number;
  code: string;
  name: string;
  description?: string;
  permissions: PERMISSION[];
  createdAt: Date;
  updatedAt: Date;
};
