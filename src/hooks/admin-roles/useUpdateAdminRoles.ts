import {adminRolesAPI} from "api/admin-roles";
import {AdminRoleDto, UpdateAdminRoleDto} from "dto/admin-roles";
import { useMutation, useQueryClient } from "react-query";
import {toast} from "react-toastify";
import axiosClient from "utils/axios-client";
import {locales} from "utils/constants";

export const updateAdminRoles = (
  id: string,
  data: UpdateAdminRoleDto
): Promise<AdminRoleDto> => {
  return axiosClient.put(`/role/${id}`, data);
};

export function useUpdateAdminRoles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAdminRoleDto }) =>
      adminRolesAPI.update(id, data),
    onSuccess: () => {
      toast(locales.updateSuccess, { type: "success" });
      queryClient.invalidateQueries({ queryKey: ["FIND_ALL_ADMIN_ROLE"] });
    },
  });
}

