import { useMutation, useQueryClient } from "react-query";
import { AdminRightDto } from "dto/admin-rights/admin-rights.dto";
import { toast } from "react-toastify";
import { adminRightsAPI } from "api/admin-rights";
import { UpdateRightMenuDto } from "dto/admin-rights/update-right-menu.dto";
import { locales } from "utils/constants";

export function useUpdateRightMenu() {
  const queryClient = useQueryClient();

  return useMutation<AdminRightDto, Error, UpdateRightMenuDto>(
    (dto: UpdateRightMenuDto) => adminRightsAPI.updateRightMenu(dto.id, dto),
    {
      onSuccess: () => {
        toast(locales.updateSuccess, { type: "success" });
        queryClient.invalidateQueries(["MENU_LOGIN"]);
        queryClient.invalidateQueries(["FIND_ALL_ADMIN_RIGHT"]);
      },
      onError: () => {
        toast(locales.somethingWentWrong, { type: "error" });
      },
    }
  );
}
