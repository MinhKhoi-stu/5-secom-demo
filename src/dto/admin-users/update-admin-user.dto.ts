import {
  CreateAdminUserDto,
  createAdminUserSchema,
} from './create-admin-user.dto';

export type UpdateAdminUserDto = Partial<CreateAdminUserDto>;

export const updateAdminUserSchema = createAdminUserSchema.omit(['password']);

export const updatePasswordAdminUserSchema = createAdminUserSchema.pick([
  'password',
]);
