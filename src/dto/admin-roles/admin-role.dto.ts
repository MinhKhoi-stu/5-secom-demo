import { PERMISSION } from 'utils/enums';

// export type AdminRoleDto = {
//   id: number;
//   code: string;
//   name: string;
//   description?: string;
//   permissions: PERMISSION[];
//   createdAt: Date;
//   updatedAt: Date;
//   username: string;
// };

export type AdminRoleDto = {
  id: string;
  code: string;
  name: string;
  level: number;
  note: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
};
