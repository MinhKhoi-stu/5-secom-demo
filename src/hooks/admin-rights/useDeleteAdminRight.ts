import {adminRightsAPI} from "api/admin-rights";
import { DefaultResponseDto } from "dto/common";
import { useMutation, useQueryClient } from "react-query";
import {toast} from "react-toastify";
import {locales} from "utils/constants";

export const useDeleteAdminRight = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DefaultResponseDto,
    Error,
    { id: string; version: number }
  >({
    mutationFn: ({ id, version }) => adminRightsAPI.delete(id, version),
    onSuccess: () => {
      toast(locales.deleteSuccess, { type: "success" });
      queryClient.invalidateQueries({ queryKey: ["FIND_ALL_ADMIN_RIGHT"] });
    },
  });
};

