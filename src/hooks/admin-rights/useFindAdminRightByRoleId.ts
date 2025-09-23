import { adminRightsAPI } from "api/admin-rights";
import { AdminRightDto } from "dto/admin-rights/admin-rights.dto";
import { useQuery } from "react-query";

export const useFindAdminRightByRoleId = (roleId: string | number | null) => {
  return useQuery<AdminRightDto, Error>(
    ["FIND_ALL_ADMIN_RIGHT", roleId ?? ""], 
    () => {
      if (!roleId) {
        return Promise.reject(new Error("roleId is required"));
      }
      return adminRightsAPI.findOne(String(roleId));
    },
    {
      enabled: !!roleId,
    }
  );
};
