import {adminUsersAPI} from "api/admin-users";
import { authAPI } from "api/auth";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PATH } from "routes/constants";
import { localStorageKey, locales } from "utils/constants";
import { QUERY_KEY } from "utils/enums";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: async (res) => {
      console.log(res);
      toast(locales.loginSuccess, { type: "success" });
      localStorage.setItem(localStorageKey.accessToken, res.data.access_token);
      localStorage.setItem(localStorageKey.refreshToken, res.data.refresh_token);
      // localStorage.setItem("username", res.data.username);

      const profileRes = await adminUsersAPI.getMyProfile();
      // queryClient.setQueryData(QUERY_KEY.GET_MY_PROFILE, res.data.profile); //based on client's data result type
      queryClient.setQueryData(QUERY_KEY.GET_MY_PROFILE, profileRes); //based on client's data result type
      navigate(PATH.HOME);
    },
  });
  return mutation;
}
