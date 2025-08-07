import { useQuery } from "react-query";
import { PagingDataDto } from "dto/common";
import {AdminRoleDto, FindAllAdminRoleDto} from "dto/admin-roles";
import {adminRolesAPI} from "api/admin-roles";

export const QUERY_KEY = {
  FIND_ALL: "FIND_ALL_ADMIN_ROLES",
};

export function useFindAllAdminRoles(params: FindAllAdminRoleDto = {}) {
  return useQuery<PagingDataDto<AdminRoleDto>>({
    queryKey: [QUERY_KEY.FIND_ALL, params],
    queryFn: () => adminRolesAPI.findAll(params),
    // staleTime: 1000 * 30,
    cacheTime: 0,
    staleTime: 0,
  });
}
