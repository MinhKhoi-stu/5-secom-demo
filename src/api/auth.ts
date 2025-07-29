import axios from "axios";
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
  // login(payload: LoginDto): Promise<any> {
  //   // return axiosClient.post("auth/login", payload);
  //   // return axiosClient.post("oauth2/token", payload);
  //   return axiosClient.post("https://5secom.dientoan.vn/api/oauth2/token", payload);
  // },
  
  login(payload: LoginDto): Promise<any> {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return axios.post("https://5secom.dientoan.vn/api/oauth2/token", formData);
},

  // logout(payload: LogoutDto): Promise<DefaultResponseDto> {
  //   return axiosClient.post("https://5secom.dientoan.vn/api/oauth2/revoke", payload, {
  //     _ignoreNotificationError: true,
  //   } as AxiosRequestConfig)
  // },
  logout(payload: LogoutDto): Promise<DefaultResponseDto> {
  return axiosClient.post("https://5secom.dientoan.vn/api/oauth2/revoke", 
    new URLSearchParams({
      // token: localStorage.getItem("accessToken") || "",
      token: "zCQ6ugT8yfrP72SqjXY8U-yGgYI61N73-gApr4B0UROU6V6n4vaw6qSrTB1UsKMqLuxtRiwp3rP16nQWHzOsWes6PjsVtIQS_UvyPwu5nmVk7vSVocCzNu1Y-4PnUHOC",
      client_id: "dichtetayninh",
      client_secret: "AVTaQ7vJes38oseonKqt",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      _ignoreNotificationError: true,
    } as AxiosRequestConfig
  );
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
  
  // refreshToken(token: string): Promise<TokenDto> {
  //   return axiosClient.post("auth/refresh-token", {}, {
  //     headers: { Authorization: `Bearer ${token}` },
  //     _ignoreRefresh: true,
  //   } as AxiosRequestConfig);
  // },

  refreshToken(refreshToken: string): Promise<TokenDto> {
  const body = new URLSearchParams({
    // refresh_token: "xcdw-NmHbQIe66qRGdbkyQs-hp5N5IxMN9Jgr7J5snIwDZ0WE9OKkOKczWhYxHP_sOAj4D5BPvsmqIJSB1inLJ-IAl8gQg7O2pTPAB5SkXCRqTGX7A8xoZ7z76_mLwiK",
    refresh_token: "",
    client_id: "dichtetayninh",
    client_secret: "AVTaQ7vJes38oseonKqt",
    grant_type: "refresh_token",
  });

  return axiosClient.post("oauth2/token", body.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    _ignoreRefresh: true,
  } as AxiosRequestConfig)
  // .then(() => {
  //     return axiosClient.post("/oauth/revoke", body.toString(), {
  //       _ignoreNotificationError: true,
  //     } as AxiosRequestConfig);
  //   });
}

};
