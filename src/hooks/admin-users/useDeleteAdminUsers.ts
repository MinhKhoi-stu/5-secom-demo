import { adminUsersAPI } from "api/admin-users";
import { DefaultResponseDto } from "dto/common";
import { useMutation, useQueryClient } from "react-query";
import {toast} from "react-toastify";
import {locales} from "utils/constants";

export const useDeleteAdminUsers = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DefaultResponseDto,
    Error,
    { id: string; version: number }
  >({
    mutationFn: ({ id, version }) => adminUsersAPI.delete(id, version),
    onSuccess: () => {
      toast(locales.deleteSuccess, { type: "success" });
      queryClient.invalidateQueries({ queryKey: ["FIND_ALL_ADMIN_USERS"] });
    },
    // onError: () => {
    //   toast(locales.areYouSureWantToDelete, { type: "success" });
    // }
  });
};

