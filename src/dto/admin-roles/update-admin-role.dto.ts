import {AdminRightDto} from "dto/admin-rights/admin-rights.dto";
import {
  createAdminRoleSchema,
} from "./create-admin-role.dto";

// export type UpdateAdminRoleDto = Partial<CreateAdminRoleDto>;

export type UpdateAdminRoleDto = {
  id: string;
  version: number;
  code: string;
  name: string;
  level?: number;
  note?: string;
  rights?: Array<AdminRightDto>;
};

export const updateAdminRoleSchema = createAdminRoleSchema;
