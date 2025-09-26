import {adminRightsAPI} from "api/admin-rights";
import {AdminRightDto} from "dto/admin-rights/admin-rights.dto";
import {UpdateRightPermissionDto} from "dto/admin-rights/update-right-permission.dto";
import {useMutation, useQueryClient} from "react-query";
import {toast} from "react-toastify";
import {locales} from "utils/constants";


export function useUpdateRightPermission() {
  const queryClient = useQueryClient();

  return useMutation<AdminRightDto, Error, UpdateRightPermissionDto>(
    (dto: UpdateRightPermissionDto) => adminRightsAPI.updateRightPermission(dto.id, dto),
    {
      onSuccess: (data) => {
        toast(locales.updateSuccess, { type: "success" });
        queryClient.invalidateQueries("FIND_ALL_ADMIN_RIGHT"); 
        queryClient.invalidateQueries(["FIND_ALL_ADMIN_RIGHT", data.id]); 
      },
    }
  );
}
