import { PERMISSION } from 'utils/enums';
import { Yup } from 'utils/yup';

export type CreateAdminRoleDto = {
  code: string;
  name: string;
  description?: string;
  permissions?: PERMISSION[];
};

export const createAdminRoleSchema = Yup.object().shape({
  code: Yup.string().max(50).required().default(''),
  name: Yup.string().max(255).required().default(''),
  description: Yup.string().max(512).notRequired(),
  permissions: Yup.array(
    Yup.mixed<PERMISSION>().oneOf(Object.values(PERMISSION)).required()
  )
    .notRequired()
    .default([]),
});
