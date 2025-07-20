import {
  CreateAdminRoleDto,
  createAdminRoleSchema,
} from './create-admin-role.dto';

export type UpdateAdminRoleDto = Partial<CreateAdminRoleDto>;

export const updateAdminRoleSchema = createAdminRoleSchema;
