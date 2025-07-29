import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { configuration } from "./configuration";
import { localStorageKey } from "./constants";
import { authAPI } from "api/auth";
import { TokenDto } from "dto/auth/token.dto";
import { PATH } from "routes/constants";
import { HTTP_STATUS } from "./enums";
import { toast } from "react-toastify";

let refreshingFunc: Promise<TokenDto> | undefined;

export type AxiosRequestConfig = InternalAxiosRequestConfig<any> & {
  _retry?: boolean;
  _ignoreRefresh?: boolean;
  _ignoreNotificationError?: boolean;
};

const axiosClient = axios.create({
  baseURL: `${configuration.API_URL}/api/`,
  // baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const accessToken = localStorage.getItem(localStorageKey.accessToken);
      if (accessToken) config.headers!.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig;
    if (
      error?.response?.status === HTTP_STATUS.UNAUTHORIZED &&
      !originalRequest?._ignoreRefresh &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem(localStorageKey.refreshToken);
      if (refreshToken) {
        try {
          if (!refreshingFunc) {
            refreshingFunc = authAPI.refreshToken(refreshToken);
          }

          const tokenDto = await refreshingFunc;
          localStorage.setItem(
            localStorageKey.accessToken,
            tokenDto.accessToken
          );
          localStorage.setItem(
            localStorageKey.refreshToken,
            tokenDto.refreshToken
          );

          originalRequest.headers.Authorization = `Bearer ${tokenDto.accessToken}`;
          return axiosClient.request(originalRequest);
        } catch (err) {
          console.error(err);
          localStorage.removeItem(localStorageKey.accessToken);
          localStorage.removeItem(localStorageKey.refreshToken);
          window.location.href = PATH.LOGIN;
          //TODO
        } finally {
          refreshingFunc = undefined;
        }
      }
    }

    if (!originalRequest?._ignoreNotificationError) {
      const data: any = error?.response?.data;

      toast(
        data?.message?.toString() ||
          error?.response?.statusText ||
          error?.message,
        { type: "error" }
      );
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
