import { createAdminUserSchema } from './create-admin-user.dto';
import { UpdateAdminUserDto } from './update-admin-user.dto';

export type UpdateMyProfileDto = Pick<
  UpdateAdminUserDto,
  'fullName' | 'phoneNumber' | 'birthday' | 'gender'
>;

export const updateMyProfileSchema = createAdminUserSchema.pick([
  'fullName',
  'phoneNumber',
  'birthday',
  'gender',
]);
