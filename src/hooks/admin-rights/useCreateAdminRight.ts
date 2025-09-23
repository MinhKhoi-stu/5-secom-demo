import {adminRightsAPI} from "api/admin-rights";
import {AdminRightDto} from "dto/admin-rights/admin-rights.dto";
import {CreateAdminRightDto} from "dto/admin-rights/create-admin-right.dto";
import {useMutation, useQueryClient} from "react-query";
import {toast} from "react-toastify";
import {locales} from "utils/constants";


export function useCreateAdminRight() {
  const queryClient = useQueryClient();

  return useMutation<AdminRightDto, Error, CreateAdminRightDto>({
    mutationFn: (data: CreateAdminRightDto) => adminRightsAPI.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["FIND_ALL_ADMIN_RIGHT"] });
      toast(locales.createSuccess, { type: "success" });
    },
    onError: (error) => {
    //   console.error("❌ Tạo quyền thất bại:", error.message);
    },
  });
}
