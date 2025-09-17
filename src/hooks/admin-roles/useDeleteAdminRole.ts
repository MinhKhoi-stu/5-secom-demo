import {adminRolesAPI} from "api/admin-roles";
import { DefaultResponseDto } from "dto/common";
import { useMutation, useQueryClient } from "react-query";
import {toast} from "react-toastify";
import {locales} from "utils/constants";

export const useDeleteAdminRole = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DefaultResponseDto,
    Error,
    { id: string; version: number }
  >({
    mutationFn: ({ id, version }) => adminRolesAPI.delete(id, version),
    onSuccess: () => {
      toast(locales.deleteSuccess, { type: "success" });
      queryClient.invalidateQueries({ queryKey: ["FIND_ALL_ADMIN_ROLES"] });
    },
  });
};

