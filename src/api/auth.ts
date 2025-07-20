import {
  LoginDto,
  LoginDataDto,
  LogoutDto,
  SendOtpDto,
  VerifyOtpDto,
  VerifyOtpDataDto,
  ResetPasswordDto,
  TokenDto,
} from "dto/auth";
import { DefaultResponseDto } from "dto/common/default-response.dto";
import axiosClient, { AxiosRequestConfig } from "utils/axios-client";
import { configuration } from "utils/configuration";

export const authAPI = {
  login(payload: LoginDto): Promise<any> {
    return axiosClient.post("auth/login", payload);
  },
  logout(payload: LogoutDto): Promise<DefaultResponseDto> {
    return axiosClient.post("auth/logout", payload, {
      _ignoreNotificationError: true,
    } as AxiosRequestConfig);
  },
  sendOtpResetPassword(payload: SendOtpDto): Promise<DefaultResponseDto> {
    return axiosClient.post("auth/reset-password/send-otp", payload);
  },
  verifyOtpResetPassword(payload: VerifyOtpDto): Promise<VerifyOtpDataDto> {
    return axiosClient.post("auth/reset-password/verify-otp", payload);
  },
  resetPassword(
    payload: ResetPasswordDto,
    token: string
  ): Promise<DefaultResponseDto> {
    return axiosClient.post("auth/reset-password", payload, {
      headers: { Authorization: `Bearer ${token}` },
      _ignoreRefresh: true,
    } as AxiosRequestConfig);
  },
  refreshToken(token: string): Promise<TokenDto> {
    return axiosClient.post("auth/refresh-token", {}, {
      headers: { Authorization: `Bearer ${token}` },
      _ignoreRefresh: true,
    } as AxiosRequestConfig);
  },
};
