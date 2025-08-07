import { useMutation, useQueryClient } from "react-query";
import {adminUsersAPI} from "api/admin-users";
import {CreateAdminUserDto} from "dto/admin-users";
import {toast} from "react-toastify";
import {locales} from "utils/constants";

export function useCreateAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAdminUserDto) => adminUsersAPI.create(data),
    onSuccess: () => {
      toast(locales.createSuccess, { type: "success" });
      queryClient.invalidateQueries({ queryKey: ["FIND_ALL_ADMIN_USERS"] });
    },
  });
}
