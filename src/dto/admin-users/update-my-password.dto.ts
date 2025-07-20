import { locales } from 'utils/constants';
import { Yup } from 'utils/yup';

export type UpdateMyPasswordDto = {
  currentPassword: string;
  password: string;
};

export const updateMyPasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().max(255).required(),
  password: Yup.string().max(255).required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], locales.confirmPasswordNotMatch)
    .max(255)
    .required(),
});
