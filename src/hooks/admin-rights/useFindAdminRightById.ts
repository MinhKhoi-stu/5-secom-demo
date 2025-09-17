import { adminRightsAPI } from "api/admin-rights";
import { AdminRightDto } from "dto/admin-rights/admin-rights.dto";
import { useQuery } from "react-query";

// export const useFindAdminRightById = (roleId: string | number | null) => {
//   return useQuery<AdminRightDto, Error>({
//     queryKey: roleId ? ["FIND_ALL_ADMIN_RIGHT", roleId] : ["FIND_ALL_ADMIN_RIGHT", "none"],
//     queryFn: () => {
//       if (roleId == null) {
//         return Promise.reject(new Error("roleId is required"));
//       }
//       return adminRightsAPI.findOne(String(roleId));
//     },
//     enabled: !!roleId,
//   });
// };

export const useFindAdminRightById = (roleId: string | number | null) => {
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
