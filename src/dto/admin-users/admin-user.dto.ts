export type AdminUserDto = {
  id: string;
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
