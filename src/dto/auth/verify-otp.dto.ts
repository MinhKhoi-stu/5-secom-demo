import { Yup } from 'utils/yup';
import { SendOtpDto } from './send-otp.dto';

export type VerifyOtpDto = SendOtpDto & {
  otp: string;
};

export type VerifyOtpDataDto = {
  token: string;
};

export const verifyOtpSchema = Yup.object().shape({
  otp: Yup.string().min(6).max(255).required(),
});
