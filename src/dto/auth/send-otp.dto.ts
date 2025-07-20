import { Yup } from 'utils/yup';

export type SendOtpDto = {
  email: string;
};

export const sendOtpSchema = Yup.object().shape({
  email: Yup.string().email().max(255).required(),
});
