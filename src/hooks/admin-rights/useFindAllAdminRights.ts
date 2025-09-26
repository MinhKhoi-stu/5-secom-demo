import { useQuery, UseQueryOptions } from "react-query";
import { PagingDataDto } from "dto/common";
import {AdminRightDto} from "dto/admin-rights/admin-rights.dto";
import {adminRightsAPI} from "api/admin-rights";
import {FindAllAdminRightDto} from "dto/admin-rights/find-all-admin-right.dto";

export const QUERY_KEY = {
  FIND_ALL: "FIND_ALL_ADMIN_RIGHTS",
};

export function useFindAllAdminRights(params: FindAllAdminRightDto = {
  page: 0,
  size: 0,
},
options?: UseQueryOptions<PagingDataDto<AdminRightDto>>
) {
  return useQuery<PagingDataDto<AdminRightDto>>({
    queryKey: [QUERY_KEY.FIND_ALL, params],
    queryFn: () => adminRightsAPI.findAll(params),
    cacheTime: 0,
    staleTime: 0,
    ...options,
  });
}
