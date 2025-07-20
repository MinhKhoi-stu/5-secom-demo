import { locales } from 'utils/constants';
import { Yup } from 'utils/yup';

export type ResetPasswordDto = {
  password: string;
};

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().max(255).required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], locales.confirmPasswordNotMatch)
    .max(255)
    .required(),
});
