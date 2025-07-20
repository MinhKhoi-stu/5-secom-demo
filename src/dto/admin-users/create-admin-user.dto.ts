import dayjs from 'dayjs';
import { ADMIN_USER_STATUS } from 'utils/enums';
import { Yup } from 'utils/yup';

export type CreateAdminUserDto = {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  birthday?: Date;
  gender?: string;
  adminRoleId?: number;
  status?: ADMIN_USER_STATUS;
};

Yup.addMethod(Yup.object, 'dayjs', function method(message) {
  return this.test('dayjs', message, function validate(value) {
    if (!value) {
      return true;
    }
    return dayjs.isDayjs(value);
  });
});

export const createAdminUserSchema = Yup.object().shape({
  fullName: Yup.string().max(255).required().default(''),
  email: Yup.string().email().max(255).required().default(''),
  password: Yup.string().max(255).required().default(''),
  phoneNumber: Yup.string().max(20).notRequired(),
  birthday: Yup.date().notRequired(),
  gender: Yup.string().max(255).notRequired(),
  adminRoleId: Yup.number().integer().notRequired(),
  status: Yup.mixed<ADMIN_USER_STATUS>()
    .oneOf(Object.values(ADMIN_USER_STATUS))
    .notRequired()
    .default(ADMIN_USER_STATUS.ACTIVE),
});
