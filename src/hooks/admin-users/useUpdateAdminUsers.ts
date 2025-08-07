import {adminUsersAPI} from "api/admin-users";
import { UpdateAdminUserDto, AdminUserDto } from "dto/admin-users";
import { useMutation, useQueryClient } from "react-query";
import {toast} from "react-toastify";
import axiosClient from "utils/axios-client";
import {locales} from "utils/constants";

export const updateAdminUser = (
  id: string,
  data: UpdateAdminUserDto
): Promise<AdminUserDto> => {
  return axiosClient.put(`/user/${id}`, data);
};

export function useUpdateAdminUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAdminUserDto }) =>
      adminUsersAPI.update(id, data),
    onSuccess: () => {
      toast(locales.updateSuccess, { type: "success" });
      queryClient.invalidateQueries({ queryKey: ["FIND_ALL_ADMIN_USER"] });
    },
  });
}

