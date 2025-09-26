import { adminRolesAPI } from "api/admin-roles";
import { AdminRoleDto } from "dto/admin-roles";
import { UpdateRightOfRoleDto } from "dto/admin-roles/update-right-of-role.dto";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { locales } from "utils/constants";

export function useUpdateRightOfRole() {
  const queryClient = useQueryClient();

  return useMutation<AdminRoleDto, Error, UpdateRightOfRoleDto>(
    (dto: UpdateRightOfRoleDto) => adminRolesAPI.updateRightOfRole(dto.id, dto),
    {
      onSuccess: (data) => {
        toast(locales.updateSuccess, { type: "success" });
        queryClient.invalidateQueries("FIND_ALL_ADMIN_ROLE");
        queryClient.invalidateQueries(["FIND_ALL_ADMIN_ROLE", data.id]);
      },
    }
  );
}
