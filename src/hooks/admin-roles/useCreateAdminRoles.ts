import { adminRolesAPI } from "api/admin-roles";
import { AdminRoleDto, CreateAdminRoleDto } from "dto/admin-roles";
import { useMutation, UseMutationResult } from "react-query";
import { toast } from "react-toastify";
import {locales} from "utils/constants";

export const useCreateAdminRoles = (): UseMutationResult<
  AdminRoleDto,
  Error,
  CreateAdminRoleDto
> => {
  return useMutation<AdminRoleDto, Error, CreateAdminRoleDto>({
    mutationFn: (newRole: CreateAdminRoleDto) => adminRolesAPI.create(newRole),
    onSuccess: () => {
      toast(locales.createSuccess, { type: "success" });
    },
  });
};
