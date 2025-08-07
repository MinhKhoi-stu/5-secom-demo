import { PagingDataDto } from "dto/common";
import { AdminUserDto, FindAllAdminUserDto } from "dto/admin-users";
import { adminUsersAPI } from "api/admin-users";
import { useQuery } from "react-query";

export const QUERY_KEY = {
  FIND_ALL: "FIND_ALL_ADMIN_USERS",
};

export function useFindAllAdminUsers(params: FindAllAdminUserDto) {
  return useQuery<PagingDataDto<AdminUserDto>>({
    queryKey: [QUERY_KEY.FIND_ALL, params],
    queryFn: () => adminUsersAPI.findAll(params),
    keepPreviousData: true,
    cacheTime: 0,
    staleTime: 0,
  });
}
